import { RouterStateSerializer } from '@ngrx/router-store';
import { RouterStateSnapshot } from '@angular/router';

export interface ParamsRouterState {
  url: string
  params: {}
  queryParams: {}
}

export class ParamsSerializer
  implements RouterStateSerializer<ParamsRouterState> {
  serialize(routerState: RouterStateSnapshot): ParamsRouterState {
    let route = routerState.root
    let { params, queryParams } = routerState.root

    // while (route.firstChild) {
    //   route = route.firstChild
    //   params = { ...params, ...route.params }
    //   queryParams = { ...queryParams, ...route.queryParams }
    // }

    return { url: routerState.url, params, queryParams }
  }
}
