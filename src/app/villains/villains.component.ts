import { Component, OnInit } from '@angular/core';

import { Villain } from '../villain';
import { VILLAINS } from '../mock-villains';
import { VillainService } from '../villain.service';

@Component({
  selector: 'app-villains',
  templateUrl: './villains.component.html',
  styleUrls: ['./villains.component.css']
})

export class VillainsComponent implements OnInit {
  //villains = VILLAINS;
  villains: Villain[];

  selectedVillain: Villain;

  constructor(private villainService: VillainService) { }

  ngOnInit() {
    this.getVillains();
  }

  onSelect(villain: Villain): void {
    this.selectedVillain = villain;
  }

  getVillains(): void {
    // this.villainService.getVillains()
    // .subscribe(villains => this.villains = villains);
    this.villains = this.villainService.getVillains();
  }

  /*
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.villainService.addVillain({ name } as Villain)
      .subscribe(villian => {
        this.villains.push(villian);
      });
  }

  delete(villain: Villain): void {
    this.villains = this.villains.filter(h => h !== villain);
    this.villainService.deleteVillain(villain).subscribe();
  }
  */
}
