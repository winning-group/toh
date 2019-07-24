import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Injectable } from '@angular/core';
import { Villain } from './villain';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Mr. Nice' },
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

    const villains = [
      { id: 11, name: 'Mr. Negatron' },
      { id: 12, name: 'Bitter Man' },
      { id: 13, name: 'Frowning Clown' },
      { id: 14, name: 'Black Inertia' },
      { id: 15, name: 'Bad Luck Chuck' },
      { id: 16, name: 'Rubber Jammer' },
      { id: 17, name: 'Ms. Magenta' },
      { id: 18, name: 'Dark Energizer' },
      { id: 19, name: 'Icicle' },
      { id: 20, name: 'Silencer' }
    ];

    return {
      heroes,
      villains
    };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId<T extends Hero | Villain>(data: T[]): number {
    return data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 11;
  }
}
