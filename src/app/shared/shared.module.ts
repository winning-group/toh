import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  HeroSearchComponent,
  MessagesComponent,
} from './components';

@NgModule({
  declarations: [
    HeroSearchComponent,
    MessagesComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    HeroSearchComponent,
    MessagesComponent,
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
