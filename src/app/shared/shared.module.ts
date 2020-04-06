import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  HeroSearchComponent,
  MessagesComponent,
  NavigationComponent,
  HeroComponent,
  VillainComponent
} from './components';

@NgModule({
  declarations: [
    HeroSearchComponent,
    MessagesComponent,
    NavigationComponent,
    HeroComponent,
    VillainComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    HeroSearchComponent,
    MessagesComponent,
    NavigationComponent,
    HeroComponent,
    VillainComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
  ],
})
export class SharedModule {
}
