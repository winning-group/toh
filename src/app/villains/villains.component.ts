import { Component, OnInit } from '@angular/core';

import { Villain } from '../villain';
import { VillainService } from '../villain.service';

@Component({
  selector: 'app-villains',
  templateUrl: './villains.component.html',
  styleUrls: ['./villains.component.css']
})
export class VillainsComponent implements OnInit {
  villains: Villain[];

  constructor(private villainService: VillainService) { }

  ngOnInit() {
    this.getVillains();
  }

  getVillains(): void {
    this.villainService.getVillains()
    .subscribe(villains => this.villains = villains);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.villainService.addVillain({ name } as Villain)
      .subscribe(villain => {
        this.villains.push(villain);
      });
  }

  delete(villain: Villain): void {
    this.villains = this.villains.filter(h => h !== villain);
    this.villainService.deleteVillain(villain).subscribe();
  }

}
