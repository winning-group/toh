import {
  Component,
  OnInit,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { HeroService } from 'core/services';
import { Hero } from 'shared/models';
import { Unsubscribe } from 'shared/modules';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent extends Unsubscribe implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {
    super();
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
