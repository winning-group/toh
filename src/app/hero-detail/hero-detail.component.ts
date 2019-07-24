import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';
import { Villain } from '../villain';
import { VillainService } from '../villain.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  villains$: Observable<Villain[]>;
  
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private villainService: VillainService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getVillainOptions();
    this.getHero();
  }

  getVillainOptions(): void {
    this.villains$ = this.villainService.getList();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}
