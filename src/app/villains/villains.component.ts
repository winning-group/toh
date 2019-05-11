import { Component, OnInit } from '@angular/core';
import { Villain } from '../villain';
import { VILLAINS } from '../mock-villains';

@Component({
  selector: 'app-villains',
  templateUrl: './villains.component.html',
  styleUrls: ['./villains.component.css']
})

export class VillainsComponent implements OnInit {
  villains = VILLAINS;

  selectedVillain: Villain;

  constructor() { }

  ngOnInit() {
  }

  onSelect(villain: Villain): void {
    this.selectedVillain = villain;
  }

}
