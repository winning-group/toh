import { NgModule } from '@angular/core';
import { CoreModule } from 'core/core.module';
import { SharedModule } from 'shared/shared.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    AppRoutingModule,
    SharedModule,
    CoreModule,
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
