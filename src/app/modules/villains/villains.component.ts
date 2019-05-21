import {
  Component,
  OnInit,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { VillainService } from 'core/services';
import { Villain } from 'shared/models';
import { Unsubscribe } from 'shared/modules';

@Component({
  selector: 'app-villains',
  templateUrl: './villains.component.html',
})
export class VillainsComponent extends Unsubscribe implements OnInit {
  villains: Villain[];

  constructor(private villainService: VillainService) {
    super();
  }

  ngOnInit() {
    this.getVillains();
  }

  getVillains(): void {
    this.villainService.getVillains()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(villains => this.villains = villains);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.villainService.addVillain({ name } as Villain)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(villain => {
        this.villains.push(villain);
      });
  }

  delete(villain: Villain): void {
    this.villains = this.villains.filter(h => h !== villain);
    this.villainService.deleteVillain(villain).subscribe();
  }
}
