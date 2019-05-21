import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { VillainsComponent } from './villains.component';
import { VillainsRoutingModule } from './villains-routing.module';

@NgModule({
  declarations: [VillainsComponent],
  imports: [
    SharedModule,
    VillainsRoutingModule,
  ],
})
export class VillainsModule {
}
