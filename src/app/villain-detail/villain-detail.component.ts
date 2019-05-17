import { Component, OnInit } from '@angular/core';
import { VillainsService } from '../shared-services/villains.service';
import { ActivatedRoute } from '@angular/router';
import { Villain } from '../models/villains';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';

/**
 * Component villain details. Display details of a villain.
 * Allow to edit the villain.
 */
@Component({
  selector: 'app-villain-detail',
  templateUrl: './villain-detail.component.html',
  styleUrls: ['./villain-detail.component.css']
})
export class VillainDetailComponent implements OnInit {

  private villainId: number;
  private villain: Villain;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    public route: ActivatedRoute,
    public villainService: VillainsService,
    private location: Location
  ) { }

  ngOnInit() {
    this.villainId = this.getVillainIdFromRoute();
    this.getVillainDetails(this.villainId);
  }

  /**
   * Get the villain with the given ID
   * @param id id of the villain
   */
  getVillainDetails(id) {
    this.villainService.getVillain(id).pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        this.villain = res;
      });
  }

  /**
   * Get the ID from the route
   */
  getVillainIdFromRoute() {
    return parseInt(this.route.snapshot.paramMap.get('id'), 10);
  }

  /**
   * Save the updated villain
   * @param villain villain to update
   */
  saveVillain(villain: Villain) {
    this.villainService.updateVillain(villain).pipe(takeUntil(this.destroyed$))
      .subscribe(() => this.goBack());
  }

  /**
   * Return to the previous location
   */
  goBack(): void {
    this.location.back();
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
