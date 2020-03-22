import * as fromRouter from "@ngrx/router-store";
import { Action, createReducer, on } from '@ngrx/store';
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface State {
  router: fromRouter.RouterReducerState<any>;
}

export const selectRouter = createFeatureSelector<
  State,
  fromRouter.RouterReducerState<any>
>("router");

const {
  selectQueryParams, // select the current route query params
  selectQueryParam // factory function to select a query param
} = fromRouter.getSelectors(selectRouter);

export const selectSelectedHeroId = selectQueryParam("id");
export const selectHero = createSelector(
  selectSelectedHeroId,
  (heroes, selectedId) => heroes[selectedId]
);

export const selectHeroById = createSelector(
  selectQueryParams,
  (heroes, params) => console.log("hero", params)
);
