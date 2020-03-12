import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';
import { SuperpowersComponent } from './superpowers.component';

const routes: Routes = [
  { path: '', component: SuperpowersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperpowersRoutingModule {
}
