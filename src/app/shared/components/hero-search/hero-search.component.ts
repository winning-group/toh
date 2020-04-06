import {
  Component,
  OnInit,
} from '@angular/core';
import {
  Observable,
  Subject,
  combineLatest,
  merge,
  zip,
  forkJoin,
  Subscription,
} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  mergeAll,
  concatMap,
  mergeMap,
  flatMap,
  concat,
} from 'rxjs/operators';

import { HeroService, VillainService } from 'core/services';
import { Hero, Villain } from 'shared/models';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
})
export class HeroSearchComponent implements OnInit {
  characters$;
  private searchTerms = new Subject<string>();


  constructor(
    private heroService: HeroService,
    private villainService: VillainService
  ) {
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.characters$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.loadResults(term))
    );
  }

  loadResults(term: string): Observable<any[]> {
    return combineLatest([
      this.villainService.searchVillains(term),
      this.heroService.searchHeroes(term),
    ]).pipe(
      // Here, combineLatest is returning an array of Observables of Villain[] | Hero[]
      // and we need to flat those arrays into one with using a map and a reduce function
      // bit of functional programming with using higher order functions here! : )
      mergeMap(arr => {
        return [ arr.reduce((acc, cur) => (acc as any).concat(cur) )]
      })
    );
}

}
