import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';
import { VillainsComponent } from './villains.component';

const routes: Routes = [
  {
    path: '', component: VillainsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VillainsRoutingModule {
}
