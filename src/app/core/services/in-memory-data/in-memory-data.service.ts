import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

import { Hero } from 'shared/models';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'spider-man', nemesis: null },
      { id: 12, name: 'iron-man', nemesis: null },
      { id: 13, name: 'wolverine', nemesis: null },
      { id: 14, name: 'daredevil', nemesis: null },
      { id: 15, name: 'hulk', nemesis: null },
      { id: 16, name: 'thor', nemesis: null },
      { id: 17, name: 'captain-america', nemesis: null },
      { id: 18, name: 'doctor-strange', nemesis: null },
      { id: 19, name: 'deadpool', nemesis: null },
      { id: 20, name: 'black-panther', nemesis: null },
    ];

    const villains = [
      { id: 11, name: 'magneto' },
      { id: 12, name: 'ultron' },
      { id: 13, name: 'thanos' },
      { id: 14, name: 'venom' },
      { id: 15, name: 'dormammu' },
      { id: 16, name: 'doctor-doom' },
      { id: 17, name: 'red-skull' },
      { id: 18, name: 'loki' },
      { id: 19, name: 'apocalypse' },
      { id: 20, name: 'carnage' },
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
