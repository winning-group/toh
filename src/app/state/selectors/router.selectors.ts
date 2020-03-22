import * as fromRouter from "@ngrx/router-store";

export const routerStateKey = 'router';

// const selectRouterSlice = createFeatureSelector<
//   RouterReducerState<ParamsRouterState>
// >(routerStateKey)

// export const selectRouteParams = createSelector(
//   selectRouterSlice,
//   state => (state && state.state && state.state.params) || {},
// )

// export const selectRouterParam = (paramName: string) =>
//  createSelector(selectRouteParams, params => params[paramName])
 