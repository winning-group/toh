import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CharacterBaseComponent } from 'app/shared/base/character-base.component';
import { CharacterTypes } from 'shared/enum/character-types';
import { HeroService, VillainService } from 'app/core/services';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-villain',
  templateUrl: './villain.component.html',
  styleUrls: ['./villain.component.scss']
})
export class VillainComponent extends CharacterBaseComponent
implements OnInit, OnDestroy {

  @Input() id: number;

  constructor(private villainService: VillainService) {
    super();
    this.type = CharacterTypes.VILLAIN;
  }

  ngOnInit(): void {
    this.baseOnInit();
  }

  ngOnDestroy(): void {
    this.baseOnDestroy();
  }

  protected getCharacter() {
    return this.villainService.getVillain(this.id)
      .pipe(takeUntil(this.unsubscriber$));
  }

}
