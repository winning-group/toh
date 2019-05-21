import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { takeUntil } from 'rxjs/operators';

import { VillainService } from 'core/services';
import { Villain } from 'shared/models';
import { Unsubscribe } from 'shared/modules';

@Component({
  selector: 'app-villain-detail',
  templateUrl: './villain-detail.component.html',
})
export class VillainDetailComponent extends Unsubscribe implements OnInit {
  @Input() villain: Villain;

  constructor(
    private route: ActivatedRoute,
    private villainService: VillainService,
    private location: Location,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getVillain();
  }

  getVillain(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.villainService.getVillain(id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(villain => this.villain = villain);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.villainService.updateVillain(this.villain)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => this.goBack());
  }
}
