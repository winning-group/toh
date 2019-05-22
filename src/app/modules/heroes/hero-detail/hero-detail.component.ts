import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
})
export class HeroDetailComponent extends Unsubscribe implements OnInit {
  @Input() hero: Hero;
  villains: Villain[];

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private villainService: VillainService,
    private location: Location,
  ) {
    super();
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    combineLatest([
      this.heroService.getHero(id),
      this.villainService.getVillains(),
    ])
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(([hero, villains]) => {
        this.hero = hero;
        this.villains = villains;
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => this.goBack());
  }

  onChangeSelection(id: string) {
    this.hero.nemesis = Number(id);
  }
}
