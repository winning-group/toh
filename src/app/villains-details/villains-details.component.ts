import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Villain }         from '../models/villain';
import { VillainService }  from '../services/villain.service';
import { BaseItemDetailComponent, GetItem, SaveItem } from '../base-details/base-details.component';

@Component({
  selector: 'app-villain-detail',
  templateUrl: '../base-details/base-details.component.html',
  styleUrls: [ '../base-details/base-details.component.scss' ]
})
export class VillainDetailComponent extends BaseItemDetailComponent<Villain> implements OnInit, GetItem, SaveItem {
  @Input() item: Villain;

  constructor(
		route: ActivatedRoute,
    location: Location,
    private villainService: VillainService,
  ) {
		super(route, location);
	}

  ngOnInit(): void {
    this.getVillain();
  }

  getVillain(): void {
    this.villainService.getVillain(this.id)
      .subscribe(villain => this.item = villain);
  }

 save(): void {
    this.villainService.updateVillain(this.item)
      .subscribe(() => this.goBack());
  }
}
