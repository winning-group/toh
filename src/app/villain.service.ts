import { Injectable } from '@angular/core';

import { Villain } from './villain';
import { VILLAINS } from './mock-villains';

@Injectable({
  providedIn: 'root',
})
export class VillainService {

  constructor() { }

  getVillains(): Villain[] {
    return VILLAINS;
  }

}
