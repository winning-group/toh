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
import { SuperpowerService } from 'app/core/services/superpowers/superpower.service';
import { Superpower } from 'app/shared/models/superpower';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
})
export class HeroDetailComponent extends Unsubscribe implements OnInit {
  @Input() hero: Hero;
  villains: Villain[];
  superpowers: Superpower[];
  heroSuperpower: number;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private villainService: VillainService,
    private superpowersService: SuperpowerService,
    private location: Location,
  ) {
    super();
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    combineLatest([
      this.heroService.getHero(id),
      this.villainService.getVillains(),
      this.superpowersService.getSuperpowers()
    ])
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(([hero, villains, superpowers]) => {
        this.hero = hero;
        this.villains = villains;
        this.superpowers = superpowers;
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.heroSuperpower) {
      const selectedPower = this.superpowers.find(power => power.id == this.heroSuperpower)
      this.hero.superpowers.push(selectedPower);
    }

    this.heroService.updateHero(this.hero)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => this.goBack());
  }

  onChangeSelection(id: string) {
    this.hero.nemesis = Number(id);
  }
}
