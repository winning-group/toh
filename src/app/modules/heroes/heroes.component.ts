import {
  Component,
  OnInit,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { HeroService } from 'core/services';
import { Hero } from 'shared/models';
import { Unsubscribe } from 'shared/modules';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
})
export class HeroesComponent extends Unsubscribe implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService) {
    super();
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name, superpowers: [] } as Hero)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
