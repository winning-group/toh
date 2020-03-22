import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';
import { ParamsSerializer } from 'app/state/store/params-serializer';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { StoreModule } from '@ngrx/store';
import { routerStateKey } from 'app/state/selectors/router.selectors';

const routes: Routes = [
  { path: '', component: HeroesComponent },
  { path: ':id', component: HeroDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    // StoreModule.forFeature(routerStateKey, routerReducer),
    // StoreRouterConnectingModule.forRoot({
    //   serializer: ParamsSerializer,
    // })
  ],
  exports: [RouterModule],
})
export class HeroesRoutingModule {
}
