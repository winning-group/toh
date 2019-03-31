import { Component, HostListener, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, filter, tap } from 'rxjs/operators';
import { breakpoints } from './enums/breakpoints';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'Tour of Heroes';
	menuOpened = false;
	onResize$ = new Subject();

	ngOnInit() {
		this.closeMobileMenuOnDesktop();
	}

	@HostListener('click') onClick() { this.closeMobileMenu(); };

	onResize($event) {
		this.onResize$.next($event.target.innerWidth);
	}

	closeMobileMenu() {
		this.menuOpened = false;
	}

	// close the mobile menu when the user resize to a desktop size;
	closeMobileMenuOnDesktop() {
		this.onResize$.pipe(
			debounceTime(250),
			filter(innerWidth => innerWidth >= breakpoints.SM && this.menuOpened),
			tap(() => this.closeMobileMenu())
		).subscribe()
	}
}
