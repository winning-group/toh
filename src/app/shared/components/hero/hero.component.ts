import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CharacterBaseComponent } from 'app/shared/base/character-base.component';
import { CharacterTypes } from 'shared/enum/character-types';
import { HeroService } from 'app/core/services';
import { takeUntil } from 'rxjs/operators';
import { Hero } from 'app/shared/models';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent extends CharacterBaseComponent
  implements OnInit, OnDestroy {

  @Input() id: number;

  get superpowers() {
    // Type Assertion - telling character object which has an Union Types to choose to be as a Hero here
    return this.character ? (this.character as Hero).superpowers : [];
  }

  constructor(private heroService: HeroService) {
    super();
    this.type = CharacterTypes.HERO;
  }

  ngOnInit(): void {
    this.baseOnInit();
  }

  ngOnDestroy(): void {
    this.baseOnDestroy();
  }

  protected getCharacter() {
    return this.heroService.getHero(this.id)
      .pipe(takeUntil(this.unsubscriber$));
  }

}
