import { NgModule } from '@angular/core';

import { SharedModule } from 'shared/shared.module';
import { HeroesComponent } from './heroes.component';
import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

@NgModule({
  declarations: [
    HeroDetailComponent,
    HeroesComponent,
  ],
  imports: [
    SharedModule,
    HeroesRoutingModule,
  ],
})
export class HeroesModule {
}
