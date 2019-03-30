import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero }         from '../models/hero';
import { HeroService }  from '../services/hero.service';
import { BaseItemDetailComponent, GetItem, SaveItem } from '../base-details/base-details.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-hero-detail',
  templateUrl: '../base-details/base-details.component.html',
  styleUrls: [ '../base-details/base-details.component.scss' ]
})
export class HeroDetailComponent extends BaseItemDetailComponent<Hero> implements OnInit, GetItem, SaveItem {
	@Input() item: Hero;
	@Output() heroFetched = new EventEmitter<Hero>();

  constructor(
		route: ActivatedRoute,
    location: Location,
    private heroService: HeroService,
  ) {
		super(route, location);
	}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
		this.heroService.getHero(this.id).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(hero => {
			this.item = hero
			this.heroFetched.emit(hero);
		});
  }

 save(): void {
	 const payload = {
		 ...this.item,
		 ...this.extras
	 }
		this.heroService.updateHero(payload).pipe(
			takeUntil(this.unsubscribe$)
		).subscribe(() => this.goBack());
  }
}
