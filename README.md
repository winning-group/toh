# Angular Tour of Heroes

## Live Demo
A live Demo can be found [https://winning-group.github.io/toh/](https://winning-group.github.io/toh/).

## Installation

```
npm install
npm start
```

## Usage
1. Fork this repository.
2. Submit a pull request back to this repository with your final answers to the technical test.
3. Notify us once responses are complete and pull requests are submitted.


## Table of contents

## [Overview of adding NgRx to the app](#overview-of-adding-NgRx-to-the-app)
## [Getting started with NgRx](#getting-started-with-NgRx)
## [Setting up NgRx](#setting-up-NgRx)
## [Directory structure](#directory-structure)
## [Creating actions](#creating-actions)
## [Adding reducers](#adding-reducers)
## [NgRx version 9 BREAKING CHANGES](#ngRx-version-9-BREAKING-CHANGES)
## [Router state](#router-state)
## [Frozen state](#frozen-state)



## Overview of adding NgRx to the app

The first step was to fixe the unit tests.  The models had not been updated since super powers were added.

Then I looked at using Nrwl to generate the code.  However, it appears that NgRx has changed a bit over the past year.  For example, class-based action creators have been replaced with the createAction and props, so I wanted to get familiar with this before imposing outdated functionality on the app.  Also, the Angular CLI has good scaffolding schematics these days, so it will be good to see what that offers us out of the box.

Then I had to decide what slice of the app state to begin with.  The hero model or selected hero seemed like a good start.  But the hero selection is using the router, and NgRx has specific tools for working with the Angular router.

With the router state in action now, route changes can be captured and replayed with the Redux dev tools.

To do is to decide on a proper directory structure, and index files for the store functions.  Implement some other actions.  Write some unit or e2e tests to take advantage of the new state management tools.




## Getting started with NgRx

There are quite a few ways to get starting with NgRx.

The docs for NrWl state:
*You manage separate slices of state using libraries and feature states.*

However, since this is just a demo app without plans of it sharing code, I think the NrWl approach would be a bit too much.  So using the basic NgRx implementation should be OK.

The NgRx docs say: *write actions before developing features to understand and gain a shared knowledge of the feature being implemented.*

Is this why it feels so un-natural trying to convert an existing code base to use NgRx?

Do we need @ngrx/store-devtools?



## Setting up NgRx

One way to add NgRx to the app is this:
```
npm install @ngrx/store @ngrx/store-devtools
```

But there are a lot of benifits in using the Angular CLI with a command such as this:
```
ng generate store State --root --module app.module.ts
```

But that causes this error:
```
An unhandled exception occurred: Schematic "store" not found in collection "@schematics/angular".
See "C:\Users\timof\AppData\Local\Temp\ng-qoKM4A\angular-errors.log" for further details.
```

This however will work, and all the config you will have to do manually.
```
ng add @ngrx/store
```

This works to just add the lib to the package.json and the app.module.ts files.


In an ideal world, we would like to do sometning like this:
```
ng generate store State --root --statePath store/reducers --module app.module.ts
ng generate effect store/App --group --root --spec false --module app.module
ng generate reducer store/reducers/auth --reducers index.ts
ng generate effect store/effects/auth --module app.module --root true
ng generate container welcome --state store/reducers/index.ts --stateInterface State
ng generate feature starships/Ships -m starships/starships.module.ts --group --spec false
ng generate container starships/ship-list --state store/reducers/index.ts --stateInterface State
ng generate container starships/ship-detail --state store/reducers/index.ts --stateInterface State
```

But currently, with NgRx 9 depending on Angular 9, shcematics are not there so we will have to do everything by hand.  Not such a bad thing so that everything that is needed if more clear.  Less magic, more learning.


Other things that will need to be added to the app include:
```
npm install @ngrx/store-devtools --save
npm install @ngrx/effects --save
```


## Directory structure

Where to put the state code?

Some example project put is on the same level as the app directory.
That doesn't sound like an appropriate place.  The next simplest approach would be to create a directory in the app/store and put all the actions, reducers, etc in single files there.

The tech challenge code however has core, modules, and shared directories.  So would it be better to fit the state somewhere in there, such as in either the shared or the core module.  Core is for singletons right?  Are state functions singletons?

As noted before Nrwl uses the library approach to separate concerns.  But we decided that was overkill.  So what is correct kill?

There are a lot of optional flags for the ng CLI command:
path, project, module, statePath, stateInterface

This indicates that there are multiple places where we want to add state.  I can understand why a separate reusable library could be a good idea.

The one project I have uses the correct kill (as opposed to overkill) approach, 
```
App/store
├── actions/
├── effects/
├── reducers/
├── selectors/
└── state/
```

Another choice for the directory structure would be a kind of feature:
The one project I have uses the correct kill approach, 
```
App/core/heroes/
├── hero-detail/
├── heroes.actions.ts
├── heroes.reducers.ts
├── heroes.selectors.ts
└── heroes.state.ts
```

This might suite the curret application better.  No need to rush into a directory structure separated like that for now.  It should be decided upon as a team and refactored after a mature decision is made.



## Creating actions

The actions are under the "architecture" link in the [official guide](https://ngrx.io/guide/store/actions).  It says they are just simple interfaces.

The first issue is when creating the actions.
```TypeScript
import { Store, Action } from 'ngrx-actions';
```

Causes the error:
```
Cannot find module 'ngrx-actions'.ts(2307)
```

As well, there is this error:
```TypeScript
(alias) class Store<T = object>
import Store
Value of type 'typeof Store' is not callable. Did you mean to include 'new'?ts(2348)
```

Cause by this:
```TypeScript
@Store({ heroes: [] })
```

We don't get any errors if my previous code setup is used:
```TypeScript
import { Action } from '@ngrx/store';
import { Hero } from '../shared/models/hero';
export enum EHeroActions {
  GetHeroes = '[Hero] Get Heroes',
  GetHeroesSuccess = '[Hero] Get Heroes Success',
  GetHero  = '[Hero] Get Hero',
  GetHeroSuccess = '[Hero] Get Hero Success'
}
export class GetHeroes implements Action {
  public readonly type = EHeroActions.GetHeroes;
}
...
export class GetHeroes implements Action {
  public readonly type = EHeroActions.GetHeroes;
}
export class GetHeroesSuccess implements Action {
  public readonly type = EHeroActions.GetHeroesSuccess;
  constructor(public payload: Hero[]) { }
}
export type CategoryActions = GetHeroes | GetHeroesSuccess;
```

Seems like a good start for the time available, but actually, this is the old way of doing things.  As the guide says actions using class-based action creators was the previously defined way before action creators were introduced.  This would have happened sometime over the past year after I created the actions [for the Tiwanaku project](https://github.com/timofeysie/tiwanaku/tree/master/src/app/store/actions).

Here is the simpler method we can use now:
```TypeScript
export const getHeroes = createAction('[Hero] Get Heroes');
```

If we need data in the action, it would looke like this:
```TypeScript
export const getHero = createAction(
  '[Hero] Get Hero',
  props<{ name: string; }>()
);
```

Look at that, props in Angular!  Is this some competition with React hooks?

To use the action, we would do this:
```TypeScript
export const getHero = createAction(
  "[Hero] Get Hero",
  props<{ selectedHeroId: string }>()
);
```

However, in the current app, the hero selection is done via the anchor tag:
```html
<a routerLink="/heroes/{{hero.id}}">
```

So what is an action going to look like which involves the router like this?  As we know, the route is kind of like the main source of truth for the current state of an app.

The official docs have [an entire section](https://ngrx.io/guide/router-store) on this subject.

Configuration starts with npm:
```
npm install @ngrx/router-store --save
```

Then in the app.module.ts file:
```TypeScript
    RouterModule.forRoot([
      // routes
    ]),
    // Connects RouterModule with StoreModule, uses MinimalRouterStateSerializer by default
    StoreRouterConnectingModule.forRoot(),
```

Actions include:

* routerRequestAction (ROUTER_REQUEST action)
* routerNavigationAction (ROUTER_NAVIGATION action)
* routerNavigatedAction (ROUTER_NAVIGATED action)
* routerCancelAction (ROUTER_CANCEL action)
* routerErrorAction (ROUTER_ERROR action)

As I understand it, there are no actions needed then to configure in an actions file, as the router stands in for that.  Then it would just be about wiring those actions into a reducer.


## Adding reducers

This is step 3 in the [official NgRx docs](https://ngrx.io/guide/store/install).  The process looks something like this:

1. Create a src/app/store/reducers folder.
2. Create a src/app/reducers/index.ts file with an empty State interface, an empty reducers map, and an empty metaReducers array.
3. Update the src/app/app.module.ts > imports array with StoreModule.forRoot(reducers, { metaReducers }).
4. Add a hero.reducer.ts to a new state folder in the app.
5. Add the HTML to the App component
6. Add App component logic

Note:  changeDetection: ChangeDetectionStrategy.OnPush to avoid issue with change detection.

This is an old style reducer:
```TypeScript
export const categoryReducers = (
  state = initialCategoryState,
  action: CategoryActions
): ICategoryState => {
  switch (action.type) {
    case ECategoryActions.GetCategoriesSuccess: {
      return {
        ...state,
        categories: action.payload
      };
    }
```

In the [section on reducers in the official docs](https://ngrx.io/guide/store/reducers), first there is a state interface from the example docs baseball example:

```TypeScript
export interface State {
  home: number;
  away: number;
}
```

Then, as previously, we set the initial state:
```TypeScript
export const initialState: State = {
  home: 0,
  away: 0,
};
```

Only then are we ready to define the reducers:
```TypeScript
const scoreboardReducer = createReducer(
  initialState,
  on(ScoreboardPageActions.homeScore, state => ({ ...state, home: state.home + 1 })),
  on(ScoreboardPageActions.awayScore, state => ({ ...state, away: state.away + 1 })),
  on(ScoreboardPageActions.resetScore, state => ({ home: 0, away: 0 })),
  on(ScoreboardPageActions.setScores, (state, { game }) => ({ home: game.home, away: game.away }))
);
export function reducer(state: State | undefined, action: Action) {
  return scoreboardReducer(state, action);
}
```


Outdated sample code from a Tour of Heroes version with NgRx from [this stackblitz](https://stackblitz.com/edit/tour-of-heroes-ngrx-entity?file=src%2Fentities%2Fheroes%2Fhero-reducer.ts)
```TypeScript
export interface HeroState extends EntityState<Hero> {
  selectedHeroId: number | null;
}
const heroAdapter = createEntityAdapter<Hero>({
    selectId: (hero: Hero) => hero.id
});
const heroInitialState: HeroState = heroAdapter.getInitialState({
    selectedHeroId: null
});
export function heroReducer(
  state: HeroState = heroInitialState,
  action
) {
  switch (action.type) {
    case heroActions.ADD_HERO_SUCCESS:
      return heroAdapter.addOne(action.payload, state);
      ...
```

It uses "@ngrx/store": "5.0.0" and "@angular/core": "5.2.3", so we are talking about then end of 2017, early 2018 for when this was relevant.

Currently we are on "@angular/core": "^9.0.6" and "@ngrx/store": "^9.0.0".  Lots of differences there.  I'm not sure if looking at *any* legacy code at this point is going to be helpful at all.

But as usual, the latest doesn't always work out of the box.

@ngrx/store@9.x doesn't have schematics implemented yet. So we would have to go back to v8.x.x works with schematics.  When setting up NgRx at first if you recall, there was this error when running:
```
ng g store State --root --module app.module.ts
```

*An unhandled exception occurred: Schematic "store" not found in collection "@schematics/angular".*

Just how new is version 9?  [The changelog shows](https://github.com/ngrx/platform/blob/master/CHANGELOG.md) 2020-03-09.

That's basically when I started this challenge!  Of course 8.6.0 was released only about a month ago.  It might be a good idea right now to look at the breaking changes from 8 to 9 just so when looking at code we can get an idea of how things have changed.


## NgRx version 9 BREAKING CHANGES

* router: The MinimalRouterStateSerializer is enabled by default.
* effects: resubscribeOnError renamed to useEffectsErrorHandler in createEffect metadata
* effects: The init action is only dispatched once The init action is now dispatched based on the identifier of the effect (via ngrxOnIdentifyEffects)
* schematics: To be inline with the Angular CLI, we migrated the --spec to --skipTest. By default skipTest is false, this way you will always be provided with *.spec.ts files
* store: Using mockSelector.setResult(undefined) will set the return value of the selector to undefined. To reset the mock selector, use mockSelector.clearResult().
* store: Immutability checks are enabled by default.
* schematics: With this change by default the minimal setup for @ngrx/store will be generated.
* schematics: The create functions are the default to create actions (createAction, reducers (createReducer) and effects (createEffect)
* Libraries will depend on Angular version 9

And as if this new feature wasn't taking enough time already, I'm going to read [Announcing NgRx Version 9: Immutability out of the box, customizable effects, and more!](https://medium.com/ngrx/announcing-ngrx-version-9-immutability-out-of-the-box-customizable-effects-and-more-e4cf71be1a5b).

At this point, the decision not to use Nrwl may have been ill-advices.  From the aticle, it turns our they are the premier sponsor for NgRx Conf which is not until November, but they are hyping it already.

But, after reading a bit more, I found what I was after, an [example app](https://github.com/ngrx/platform/tree/master/projects/example-app) using the new syntax.  There is even a [Stackblitz live sample](https://stackblitz.com/run?file=projects%2Fexample-app%2Fsrc%2Fapp%2Freducers%2Findex.ts) to see it in action.

Here is some of the reducer from that codebase along with some very interesting comments:
```TypeScript
/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  [fromLayout.layoutFeatureKey]: fromLayout.State;
  router: fromRouter.RouterReducerState<any>;
}
/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<State, Action>
>('Root reducers token', {
  factory: () => ({
    [fromLayout.layoutFeatureKey]: fromLayout.reducer,
    router: fromRouter.routerReducer,
  }),
});
// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const result = reducer(state, action);
    return result;
  };
}
/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];
/**
 * Layout Reducers
 */
export const selectLayoutState = createFeatureSelector<State, fromLayout.State>(
  fromLayout.layoutFeatureKey
);
export const selectShowSidenav = createSelector(
  selectLayoutState,
  fromLayout.selectShowSidenav
);
```

That's quite a lot for a basic solution.  But maybe there is no basic solution for NgRx.  After all, that's why there is Atika, MobX, Observable Store, Angular Effects and other solutions for state management.

So it's back to the docs.  Skip the adapter and stick to just what the docs say.

We could do something like this:
```TypeScript
export interface State {
  selectedHeroId: number | null;
}
export const initialState: State = {
  selectedHeroId: null
};
const heroReducer = createReducer(
  initialState,
``` 

But remember how heroes get selected in the app?  Via a link to the detail page.  So what we need is the reducer example from the router section.


## Router state

We want to let the user to be able to share or bookmark particular heroes, such as Iron Man:
```
http://localhost:4200/heroes/12
```

This should lead directly to the any state such as the detail page.  

We currently inject the router into the hero-detail.component. To avoid this we can use @ngrx/router-store.  But since we already have a kind of state in the route, do we really need this?

I found this explaination of why it's a good idea:
*Letting components to extract path / query params from navigation / router-state and then use it to select respective state slices and / or dispatch actions we end up with lot of code duplication between sibling components and unnecessary coupling between parent and children components where a child component may need a router param extracted by parent component along side its own.*

The [solution mentioned here](https://medium.com/simars/ngrx-router-store-reduce-select-route-params-6baff607dd9) is to let the selectors, reducers and side-effects deal with the router and let components depend only the Store.

This method has a nice reducer called merged-route.ts which gets all routing state data in one shot.

But there is more than this.  A merged-route-serialzer.ts to provide a custom RouterStateSerializer<T> which gives us routing state in a form we like 
```
<T= MergedRoute>
```

But that's not all folks!  We also need a module included in the root module: ngrx-router.module.ts.

That's a lot of boiler plate code needed just for an article.  Will this articule be updated with the next major release of NgRx?  Are there hidden bugs that will be difficult to debug?  Is this a standard approach?  It's questions like this that should give a lead developer pause when jumping into a solution for something so all-encompasing as the routing of an app.

Currently, the router state is working.  You can use the dev tools to replay all the route changes and all the info about the changes is available via the merged route class.

The reducer is called hero.reducer, but should be renamed router.reducer so that hero.reducer can be used for hero actions.  I'm going to follow the model of the scoreboard reducer in [the official docs](https://ngrx.io/guide/store/reducers) to get started with those next.  It needs to implement the hero actions which are just sketched out for now.

For the user, nothing has changed of course, but we now have a functioning router state as a starting point.  We now have
Serializability
By normalizing state changes and passing them through observables, NgRx provides serializability and ensures state is predictably stored. This enables to save the state to an external storage, for example, localStorage.

Devs can now inspect, download, upload, and dispatch actions, all from the Store Devtools.

Here are some other benefits of using NgRx router-state library.

The router functionality is encapsulation and any interaction with external resources side effects, like network requests, web socket and any business logic can be isolated from the UI. This isolation allows for more pure and simple components, and keep the single responsibility principle.

The Store is built on a single immutable data state and can be accessed by many components and services.  State that is persisted and rehydrated so that state that needs to be available when re-entering routes can be accomplished.  State can be retrieved with a side-effect and can be impacted by actions from other sources.



## Frozen state

I found an interesting issue when trying out some of the code from [this blog](https://timdeschryver.dev/blog/managing-different-slices-of-the-same-ngrx-state) froze the app!

These lines of code in the heroes-routing.module make the app un-responsive:
```
   StoreModule.forFeature(routerStateKey, routerReducer),
    StoreRouterConnectingModule.forRoot({
      serializer: ParamsSerializer,
    })
```

In the console, messages like this show up:
```
common.js:458 Throttling navigation to prevent the browser from hanging. See https://crbug.com/882238. Command line switch --disable-ipc-flooding-protection can be used to bypass the protection
```

But the app tab wont close or respond, and Chrome refuses to be closed until the task manager kills the process.

The sample code from this article included a params-serializer class which is a custom serializer that only serializes the parameters and query parameters for all route levels, and that's all we need.  The stated reason for this is that there are two serializers built in the @ngrx/router-store.  The DefaultRouterStateSerializer and a MinimalRouterStateSerializer. Both serializers serializing too much data so a simple version is created that only uses the parameter of the URI.



