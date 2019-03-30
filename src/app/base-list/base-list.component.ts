import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

// an interface to get the collection method to be implement in the list page
export interface GetCollection {
	getCollection(): void;
}
// an interface to add an item method to be implement in the list page
export interface AddItem {
	add(name: string): void;
}

// an interface to delete an item method to be implement in the list page
export interface DeleteItem<T> {
	delete(item: T): void;
}

// an interface for the labels object
export interface Labels {
	singular: string;
	plural: string;
}

/**
 * an abstract class to be extend to implement list page rather than having to repeat the same logic
 * Takes a Generic type <T> such as Hero, Villain...etc.
 */
@Component({})
export abstract class BaseList<T> implements OnInit, OnDestroy {
	labels: Labels = {
		singular: '',
		plural: '',
	}
	collection: T[] = [];
	unsubscribe$ = new Subject();

	get singularLabel() {
		return this.labels.singular;
	}

	get pluralLabel() {
		return this.labels.plural;
	}
	
  ngOnInit() {
    this.getCollection();
	}
	
	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

  getCollection(): void {}

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
  }

  delete(item: T): void {
    this.collection = this.collection.filter(i => i !== item);
  }

}
