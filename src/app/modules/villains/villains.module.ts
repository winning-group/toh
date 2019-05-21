import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { VillainDetailComponent } from './villain-detail/villain-detail.component';
import { VillainsComponent } from './villains.component';
import { VillainsRoutingModule } from './villains-routing.module';

@NgModule({
  declarations: [
    VillainDetailComponent,
    VillainsComponent,
  ],
  imports: [
    SharedModule,
    VillainsRoutingModule,
  ],
})
export class VillainsModule {
}
