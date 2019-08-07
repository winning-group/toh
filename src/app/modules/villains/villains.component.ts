import {
  Component,
  OnInit,
} from '@angular/core';
import { combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  HeroService,
  VillainService,
} from 'core/services';
import {
  Hero,
  Villain,
} from 'shared/models';
import { Unsubscribe } from 'shared/modules';

@Component({
  selector: 'app-villains',
  templateUrl: './villains.component.html',
})
export class VillainsComponent extends Unsubscribe implements OnInit {
  villains: Villain[];

  constructor(
    private heroService: HeroService,
    private villainService: VillainService,
  ) {
    super();
  }

  ngOnInit() {
    combineLatest([
      this.villainService.getVillains(),
      this.heroService.getHeroes(),
    ])
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(([villains, heroes]) => {
        this.villains = villains.map((villain: Villain): Villain => {
          const assigned = heroes.filter((hero: Hero) => hero.nemesis === villain.id);

          return assigned.length > 0
            ? { ...villain, disabled: true }
            : { ...villain, disabled: false };
        });
      });
  }

  getVillains(): void {
    this.villainService.getVillains()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(villains => this.villains = villains);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.villainService.addVillain({ name } as Villain)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(villain => {
        this.villains.push(villain);
      });
  }

  delete(villain: Villain): void {
    this.villains = this.villains.filter(h => h !== villain);
    this.villainService.deleteVillain(villain).subscribe();
  }
}
