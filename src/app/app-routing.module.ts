import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: './modules/dashboard/dashboard.module#DashboardModule' },
  { path: 'heroes', loadChildren: './modules/heroes/heroes.module#HeroesModule' },
  { path: 'villains', loadChildren: './modules/villains/villains.module#VillainsModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
