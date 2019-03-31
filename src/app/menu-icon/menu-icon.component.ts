import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
	selector: 'app-menu-icon',
	templateUrl: './menu-icon.component.html',
	styleUrls: ['./menu-icon.component.scss']
})
export class MenuIconComponent {
	@Input() opened;
	@Output() openedChange = new EventEmitter<boolean>();

	toggleMenu() {
		this.opened = !this.opened;
		this.openedChange.next(this.opened);
	}
}