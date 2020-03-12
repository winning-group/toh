import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { SuperpowersComponent } from './superpowers.component';
import { SuperpowersRoutingModule } from './superpowers-routing.module';

@NgModule({
  declarations: [
    SuperpowersComponent,
  ],
  imports: [
    SharedModule,
    SuperpowersRoutingModule,
  ],
})
export class SuperpowersModule {
}
