import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';


// an interface to get an item method to be implement in the details page
export interface GetItem {
	getItem(): void;
}

// an interface to save an item method to be implement in the details page
export interface SaveItem {
	save(): void;
}

/**
 * an abstract class to be extend to implement details page rather than having to repeat the same logic
 * Takes a Generic type <T> such as Hero, Villain...etc.
 */
@Component({})
export abstract class BaseItemDetailComponent<T> implements OnInit, OnDestroy {
	@Input() item: T;
	@Input() extras;
	
	unsubscribe$ = new Subject();
	
	get id() {
		return +this.route.snapshot.paramMap.get('id');
	}
	
  constructor(
		private route,
    private location,
  ) {}

  ngOnInit(): void {
    this.getItem();
	}
	
	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

  getItem(): void { }

  goBack(): void {
    this.location.back();
  }

 	save(): void {}
}
