import { Component, OnInit } from '@angular/core';
import { VillainsService } from '../shared-services/villains.service';
import { Villain } from '../models/villains';
import { takeUntil, filter, mergeMap, map, flatMap, switchMap } from 'rxjs/operators';
import { ReplaySubject, forkJoin } from 'rxjs';
import { HeroService } from '../shared-services/hero.service';

/**
 * Component VillainsComponent : display the list of villains
 */
@Component({
  selector: 'app-villains',
  templateUrl: './villains.component.html',
  styleUrls: ['./villains.component.css']
})
export class VillainsComponent implements OnInit {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private villainsList: Villain[];
  private isNotEmpty = true;
  private isNotAssigned = true;

  constructor(
    public heroService: HeroService,
    public villainsService: VillainsService
  ) { }

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
    if (!name) {
      this.isNotEmpty = false;
      return;
    }
    this.isNotEmpty = true;
    this.villainsService.addVillain({ name } as Villain)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(res => {
        this.villainsList.push(res);
      });
  }

  /**
   * Remove the villain with the specified ID, if he
   * is not assigned to a hero
   * @param id id of the villain to remove
   */
  deleteVillain(id: number) {
    this.heroService.getHeroes().
    pipe(takeUntil(this.destroyed$))
    .subscribe(
      (heros) => {
        if (heros.filter((value) => value.nemesis.id === id).length > 0) {
          this.isNotAssigned = false;
        } else {
          this.isNotAssigned = true;
          this.villainsService.deleteVillain(id).pipe(takeUntil(this.destroyed$))
            .subscribe(() => {
              this.villainsList = this.villainsList.filter(villain => villain.id !== id);
            });
        }
      }
    )
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
