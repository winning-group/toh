import {
  Component,
  OnInit,
} from '@angular/core';
import { combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { HeroService, VillainService } from 'core/services';
import { Hero, Villain } from 'shared/models';
import { Unsubscribe } from 'shared/modules';
import { CharacterTypes } from 'shared/enum/character-types';

import { shuffleAnArray } from 'shared/utils/shuffle-an-array';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent extends Unsubscribe implements OnInit {
  villains: Villain[];
  heroes: Hero[];
  characters: (Hero | Villain)[] = [];

  constructor(
    private heroService: HeroService,
    private villainService: VillainService,
  ) {
    super();
  }

  ngOnInit() {
    this.fetchCharacters();
  }

  fetchCharacters(): void {
    combineLatest([
      this.villainService.getVillains(),
      this.heroService.getHeroes(),
    ])
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(([villains, heroes]) => {

        // Assigning a value called type so we can differenciate different type of characters
        this.villains = villains.map((villain: Villain): Villain => {
          return { ...villain, type: CharacterTypes.VILLAIN };
        });
        this.heroes = heroes.map((hero: Hero): Hero => {
          return { ...hero, type: CharacterTypes.HERO };
        });

        // Merging them all into one big array
        this.characters = [
          ...this.villains,
          ...this.heroes
        ];

        // Type Aliases the utility function shuffleAnArray()
        type Callback = (array: (Hero | Villain)[]) => (Hero | Villain)[];
        const shuffle: Callback = x => shuffleAnArray(this.characters);

        // Use that utility function to shuffle our array so we mix villains and herooes!
        this.characters = shuffle(this.characters);

    });
  }

}
