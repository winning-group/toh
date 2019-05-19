import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  private title = 'Tour of Heroes';
  private hide = true;
  constructor() { }

  ngOnInit() {

  }

}
