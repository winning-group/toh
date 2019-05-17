import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './models/hero';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Mr. Nice', nemesis: 'none' },
      { id: 12, name: 'Narco', nemesis: 'none' },
      { id: 13, name: 'Bombasto', nemesis: 'none' },
      { id: 14, name: 'Celeritas',nemesis: 'none' },
      { id: 15, name: 'Magneta', nemesis: 'none' },
      { id: 16, name: 'RubberMan', nemesis: 'none' },
      { id: 17, name: 'Dynama', nemesis: 'none' },
      { id: 18, name: 'Dr IQ', nemesis: 'none' },
      { id: 19, name: 'Magma', nemesis: 'none' },
      { id: 20, name: 'Tornado', nemesis: 'none' }
    ];

    const villains = [
      { id: 21, name: 'Dr. Doom' },
      { id: 22, name: 'Thanos' },
      { id: 23, name: 'Galactus' },
      { id: 24, name: 'Ultron' },
      { id: 25, name: 'Juggernaut' },
      { id: 26, name: 'Surtur' },
      { id: 27, name: 'Onslaught' },
      { id: 28, name: 'Apocalypse' },
      { id: 29, name: 'Kingpin' },
      { id: 30, name: 'Magneto' }
    ]
    return {
      heroes: heroes,
      villains: villains
    };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
