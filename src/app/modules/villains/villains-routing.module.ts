import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';
import { VillainsComponent } from './villains.component';
import { VillainDetailComponent } from './villain-detail/villain-detail.component';

const routes: Routes = [
  { path: '', component: VillainsComponent },
  { path: ':id', component: VillainDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VillainsRoutingModule {
}
