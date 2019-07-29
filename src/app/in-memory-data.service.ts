import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Injectable } from '@angular/core';
import { Nemesis } from './nemesis';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Mr. Nice' ,nemesis: ''},
      { id: 12, name: 'Narco',nemesis: '' },
      { id: 13, name: 'Bombasto',nemesis: '' },
      { id: 21, name: 'Villains!',nemesis: 'Jamesbond' },
      { id: 14, name: 'Celeritas',nemesis: '' },
      { id: 15, name: 'Magneta',nemesis: '' },
      { id: 16, name: 'RubberMan',nemesis: '' },
      { id: 17, name: 'Dynama',nemesis: '' },
      { id: 18, name: 'Dr IQ',nemesis: '' },
      { id: 19, name: 'Magma',nemesis: '' },
      { id: 20, name: 'Tornado',nemesis: '' }
    ];
    

     const nemesis: Nemesis[] = [
      { id: 555, name: 'Jamesbond'},
      { id: 666, name: 'Avtaar' },
      { id: 777, name: 'Spiderman'},
      { id: 888, name: 'Ironman'}
     ];
     return {heroes,nemesis};
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
