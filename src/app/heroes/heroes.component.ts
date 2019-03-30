import { Component, OnInit } from '@angular/core';

import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';
import { BaseList, GetCollection, AddItem, DeleteItem } from '../base-list/base-list.component';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-heroes',
  templateUrl: '../base-list/base-list.component.html',
  styleUrls: ['../base-list/base-list.component.scss']
})
export class HeroesComponent extends BaseList<Hero> implements GetCollection, AddItem, DeleteItem<Hero> {
	labels = {
		singular: 'Hero',
		plural: 'My Heroes',
	}
  constructor(private heroService: HeroService) {
		super();
	}

  getCollection(): void {
		this.heroService.getHeroes().pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(heroes => this.collection = heroes);
  }

  add(name: string): void {
		super.add(name);
		this.heroService.addHero({ name } as Hero).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(hero => {
        this.collection.push(hero);
      });
  }

  delete(hero: Hero): void {
		super.delete(hero);
    this.collection = this.collection.filter(i => i !== hero);
    this.heroService.deleteHero(hero).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe();
  }

}
