import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { VillainsComponent } from './villains/villains.component';
import { VillainDetailComponent } from './villains-details/villains-details.component';
import { HeroWithExtraDetailsComponent } from './hero-detail/hero-with-extra-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
	{ path: 'hero/:id', component: HeroWithExtraDetailsComponent },
	{ path: 'villain/:id', component: VillainDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'villains', component: VillainsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
