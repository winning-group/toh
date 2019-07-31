import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

import { Villain } from '../../shared';
import { VillainService } from '../villain.service';

@Component({
  selector: 'app-villain-detail',
  templateUrl: './villain-detail.component.html',
  styleUrls: ['../villain.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VillainDetailComponent {
  editingVillain: Villain;

  constructor( private _vService: VillainService){
    this.editingVillain = _vService.selectedVillian;
  }

  saveVillain() {
    this._vService.updateVillain(this.editingVillain);
  }
}
