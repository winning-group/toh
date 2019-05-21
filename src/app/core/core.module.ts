import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import {
  HeroService,
  InMemoryDataService,
  MessageService,
  VillainService,
} from './services';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false },
    ),
  ],
  providers: [
    HeroService,
    MessageService,
    VillainService,
  ],
})
export class CoreModule {
}
