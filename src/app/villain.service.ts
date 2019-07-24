import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MessageService } from './message.service';
import { ReferenceDataService } from './reference-data.service';

import { Villain } from './villain';

@Injectable({
  providedIn: 'root'
})
export class VillainService extends ReferenceDataService<Villain> {

  constructor(
    http: HttpClient,
    messageService: MessageService,
  ) {
    super(http, messageService, "api/villains", "villain");
  }
}
