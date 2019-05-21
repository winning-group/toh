import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

import { Hero } from 'shared/models';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Iron Man', nemesis: null },
      { id: 12, name: 'Wolverine', nemesis: null },
      { id: 13, name: 'Spider-Man', nemesis: null },
      { id: 14, name: 'Daredevil', nemesis: null },
      { id: 15, name: 'Hulk', nemesis: null },
      { id: 16, name: 'Thor', nemesis: null },
      { id: 17, name: 'Captain America', nemesis: null },
      { id: 18, name: 'Doctor Strange', nemesis: null },
      { id: 19, name: 'Deadpool', nemesis: null },
      { id: 20, name: 'Black Panther', nemesis: null },
    ];

    const villains = [
      { id: 11, name: 'Magneto' },
      { id: 12, name: 'Ultron' },
      { id: 13, name: 'Thanos' },
      { id: 14, name: 'Venom' },
      { id: 15, name: 'Dormammu' },
      { id: 16, name: 'Doctor Doom' },
      { id: 17, name: 'Red Skull' },
      { id: 18, name: 'Loki' },
      { id: 19, name: 'Apocalypse' },
      { id: 20, name: 'Carnage' },
    ];

    return {
      heroes,
      villains,
    };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the hero-list array is empty,
  // the method below returns the initial number (11).
  // if the hero-list array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ?
      Math.max(...heroes.map(hero => hero.id)) + 1 :
      11;
  }
}
