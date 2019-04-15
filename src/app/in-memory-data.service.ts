import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Superpower } from './superpower';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Mr. Nice', superpowers: [{ id: 11, name: 'Fly' }] },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    const superpowers = [
      { id: 11, name: 'Fly' },
      { id: 12, name: 'Web Attack' },
      { id: 13, name: 'Flash' },
      { id: 14, name: 'Dash' },
      { id: 15, name: 'Mind Control' }
    ];
    return {heroes, superpowers};
  }

  // Overrides the genId method to ensure that a hero/superpower always has an id.
  // If the heroes/superpowers array is empty,
  // the method below returns the initial number (11).
  // if the heroes/superpowers array is not empty, the method below returns the highest
  // hero/superpower id + 1.
  genId<T extends Hero | Superpower>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 11;
  }
}
