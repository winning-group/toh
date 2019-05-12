import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Villain } from './villain';
import { VILLAINS } from './mock-villains';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class VillainService {

  constructor(private messageService: MessageService) { }

  /*
  getVillains(): Villain[] {
    return VILLAINS;
  }
  */
  getVillains(): Observable<Villain[]> {
    this.messageService.add('VillainService: fetched villains');
    return of(VILLAINS); //returns an Observable that emits a single value, the array of mock villains.
  }

  getVillain(id: number): Observable<Villain> {
    this.messageService.add(`VillainService: fetched villain id=${id}`);
    return of(VILLAINS.find(villain => villain.id === id));
  }

}
