import { Component, OnInit } from '@angular/core';
import { VillainsService } from '../shared-services/villains.service';
import { Villain } from '../models/villains';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-villains',
  templateUrl: './villains.component.html',
  styleUrls: ['./villains.component.css']
})
export class VillainsComponent implements OnInit {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private villainsList: Villain[];

  constructor(public villainsService: VillainsService) { }

  ngOnInit() {
    this.getVillainsList();
  }

  /**
   * Get the list of villains
   */
  getVillainsList(): void {
    this.villainsService.getVillains()
      .pipe(takeUntil(this.destroyed$)).subscribe((res) => {
        this.villainsList = res;
      });
  }

  /**
   * Add a villain
   * @param value Name of the villain
   */
  addVillain(name: string) {
    name = name.trim();
    if (!name) { return; }
    this.villainsService.addVillain({ name } as Villain)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(res => {
        this.villainsList.push(res);
      });
  }

  /**
   * Remove the villain with the specified ID
   * @param id id of the villain to remove
   */
  deleteVillain(id: number) {
    this.villainsService.deleteVillain(id).subscribe((res) => {
      this.villainsList = this.villainsList.filter(villain => villain.id !== id);
    });
  }

  /**
   * Automatically unsubscribe observables when the component 
   * is destroyed.
   */
  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
