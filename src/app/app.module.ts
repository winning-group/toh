import { NgModule } from '@angular/core';
import { CoreModule } from 'core/core.module';
import { SharedModule } from 'shared/shared.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { NgrxRouterStoreModule } from './ngrx-router.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';

@NgModule({
  imports: [
    AppRoutingModule,
    SharedModule,
    CoreModule,
    NgrxRouterStoreModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Book Store App'
    }),
    StoreRouterConnectingModule.forRoot()
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
