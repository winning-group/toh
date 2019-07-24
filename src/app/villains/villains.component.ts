import { Component, OnInit } from '@angular/core';

import { VillainService } from '../villain.service';
import { Villain } from '../villain';

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

  getVillains() {
    this.villainService.getList()
      .subscribe(villains => this.villains = villains);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.villainService.add({ name } as Villain)
      .subscribe(villain => {
        this.villains.push(villain);
      });
  }

  delete(villain: Villain): void {
    this.villains = this.villains.filter(v => v !== villain);
    this.villainService.delete(villain).subscribe();
  }

}
