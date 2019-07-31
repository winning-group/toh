import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { Villain } from '../villain';
import { HEROES } from '../mock-heroes';
import { VILLAINS } from '../mock-villains';
import { HeroService } from '../hero.service';
import { VillainService } from '../villain.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  villains: Villain[] = [];

  constructor(private heroService: HeroService, private villainService: VillainService) { }

  ngOnInit() {
    //this.getHeroesAndVillains();
    this.heroes = HEROES.slice(1, 5);
    this.villains = VILLAINS.slice(1, 5);
  }

  getHeroesAndVillains(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
    this.villainService.getVillains()
      .subscribe(villains => this.villains = villains.slice(1, 5));
  }
}
