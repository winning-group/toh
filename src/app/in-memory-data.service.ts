import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Mr. Nice', type: 'hero' },
      { id: 12, name: 'Narco', type: 'hero' },
      { id: 13, name: 'Bombasto', type: 'hero' },
      { id: 14, name: 'Celeritas', type: 'hero' },
      { id: 15, name: 'Magneta', type: 'hero' },
      { id: 16, name: 'RubberMan', type: 'hero' },
      { id: 17, name: 'Dynama', type: 'hero' },
      { id: 18, name: 'Dr IQ', type: 'hero' },
      { id: 19, name: 'Magma', type: 'hero' },
      { id: 20, name: 'Tornado', type: 'hero' },
      { id: 21, name: 'Night King', type: 'villain' },
      { id: 22, name: 'Valdemort', type: 'villain' },
      { id: 23, name: 'Saruman', type: 'villain' },
      { id: 24, name: 'Grindelwald', type: 'villain' },
      { id: 25, name: 'Ursula', type: 'villain' },
      { id: 26, name: 'The Joker', type: 'villain' },
      { id: 27, name: 'Lex Luthor', type: 'villain' },
      { id: 28, name: 'Maleficent', type: 'villain' },
      { id: 29, name: 'Jafar', type: 'villain' },
      { id: 30, name: 'Gaston', type: 'villain' }
    ];
    return {heroes};
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
