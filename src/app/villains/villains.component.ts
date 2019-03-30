import { Component } from '@angular/core';
import { Villain } from '../models/villain';
import { VillainService } from '../services/villain.service';
import { BaseList, GetCollection, AddItem, DeleteItem } from '../base-list/base-list.component';

@Component({
	selector: 'app-villains',
  templateUrl: '../base-list/base-list.component.html',
  styleUrls: ['../base-list/base-list.component.scss']
})
export class VillainsComponent extends BaseList<Villain> implements GetCollection, AddItem, DeleteItem<Villain> {
	labels = {
		singular: 'Villain',
		plural: 'Villains',
	};

	constructor(private villainService: VillainService) {
		super();
	}

  getCollection(): void {
    this.villainService.getVillains()
    .subscribe(villains => this.collection = villains);
  }

  add(name: string): void {
		super.add(name);
    this.villainService.addVillain({ name } as Villain)
      .subscribe(villain => {
        this.collection.push(villain);
      });
  }

  delete(villain: Villain): void {
		super.delete(villain);
    this.collection = this.collection.filter(i => i !== villain);
    this.villainService.deleteVillain(villain).subscribe();
  }

}
