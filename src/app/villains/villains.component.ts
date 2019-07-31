import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Villain } from '../shared';
import { VillainService } from './villain.service';

@Component({
  selector: 'app-villains',
  templateUrl: './villains.component.html',
  styleUrls: ['./villain.css']
})
export class VillainsComponent implements OnInit {
  villains: Villain[];
  message = '?';

  constructor(
    private villainService: VillainService // , private modalService: ModalService
  ) {}

  ngOnInit() {
    this.villains = this.villainService.getAllVillain();
    this.clear();
  }

  add(villainName: string) {
    this.villainService.addNewVillain({id:'B1', name:villainName});
  }

  clear() {
    this.villainService.selectedVillian = null;
  }

  deleteVillain(index) {
    this.villainService.deleteVillain(index);
    this.clear();
  }

  select(villain: Villain) {
    this.villainService.selectedVillian = villain;
  }
}
