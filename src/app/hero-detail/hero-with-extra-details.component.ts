import { Component, OnInit, OnDestroy } from '@angular/core';
import { VillainService } from '../services/villain.service';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { Villain } from '../models/villain';

@Component({
	selector: 'app-hero-with-extra-details',
	templateUrl: './hero-with-extra-details.component.html',
	styleUrls: ['hero-with-extra-details.component.scss']
})
export class HeroWithExtraDetailsComponent implements OnInit, OnDestroy{
	
	unsubscribe$ = new Subject();
	nemesis: Villain[];
	heroName: string;
	selected: {
		nemesis: number[]		
	} = { nemesis: [] };


	set selectedNemesis(values) {
		this.selected = {
			...this.selected,
			nemesis: values
		}
	}

	get selectedNemesis() {
		return this.selected.nemesis;
	}

	constructor(private villainService: VillainService) {}

	ngOnInit() {
		this.getNemesis();
	}
	
	
	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}
	
	getNemesis() {
		this.villainService.getVillains().pipe(
			takeUntil(this.unsubscribe$),
			tap(nemesis => {
				this.nemesis = nemesis;
			})
		)
		.subscribe()
	}

	onHeroFetched(hero) {
		this.heroName = hero.name;
		this.selectedNemesis = hero.nemesis || [];
	}
}