import { createAction, props } from "@ngrx/store";
import { Hero } from '../../shared/models/hero';
export const getHeroes = createAction("[Hero] Get Heroes");
export const getHeroesSuccess = createAction("[Hero] Get Heroes Success");
export const getHero = createAction(
  "[Hero] Get Hero",
  props<{ selectedHeroId: string }>()
);
export const GetHeroSuccess = createAction("[Hero] Get Hero Success");
export const setHero = createAction('[Hero] Set Hero', props<{hero: Hero}>());
