import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { Hero } from '../models/hero';
import { HeroService } from '../shared-services/hero.service';
import { VillainsService } from '../shared-services/villains.service';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject, forkJoin } from 'rxjs';
import { Villain } from '../models/villains';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  private hero: Hero;
  private villainsList: Villain[];
  private formCtrl;
  private heroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private heroService: HeroService,
    private villainsService: VillainsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getDatas()
    // this.getHero();
    // this.getVillainsList();
  }

  /**
   * Init the form
   */
  initForm() {

    this.formCtrl = {} as FormControl;

    this.formCtrl.name = new FormControl('', {
      validators: Validators.compose([
        Validators.required])
    });
    this.formCtrl.nemesis = new FormControl('none', {
      validators: Validators.compose([
        Validators.required])
    });

    this.heroForm = this.formBuilder.group({
      name: this.formCtrl.name,
      nemesis: this.formCtrl.nemesis,
    });
  }

  /**
   * Get datas
   */
  getDatas() {
    forkJoin(
      this.getVillainsList(),
      this.getHero()
    ).pipe(takeUntil(this.destroyed$))
      .subscribe(([villains, hero]) => {
        this.villainsList = villains;
        this.hero = hero;
        this.updateValue(hero);
      });
  }

  /**
   * Get the list of villains
   */
  getVillainsList() {
    return this.villainsService.getVillains();
  }

  /**
   * Populate inputs with the hero datas
   * @param hero 
   */
  updateValue(hero: Hero) {
    this.heroForm.controls['name'].setValue(this.hero.name);
    this.heroForm.controls['nemesis'].setValue(this.hero.nemesis);
  }

  /**
   * Get hero details
   */
  getHero() {
    const id = +this.route.snapshot.paramMap.get('id');
    return this.heroService.getHero(id);
  }

  goBack(): void {
    this.location.back();
  }

  /**
   * Save the updated hero
   */
  save(): void {
    let newHero: Hero = {
      id: this.hero.id,
      name: this.heroForm.value.name,
      nemesis: this.heroForm.value.nemesis
    }

    this.heroService.updateHero(newHero)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => this.goBack());
  }

  /**
   * Allow to prepopulate the dropdown villain list
   * if the hero has a nemesis
   */
  compare(val1, val2) {
    return val1.id === val2.id;
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
