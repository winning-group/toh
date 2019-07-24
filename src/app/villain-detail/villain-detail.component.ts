import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Villain } from '../villain';
import { ActivatedRoute } from '@angular/router';
import { VillainService } from '../villain.service';

@Component({
  selector: 'app-villain-detail',
  templateUrl: './villain-detail.component.html',
  styleUrls: ['./villain-detail.component.css']
})
export class VillainDetailComponent implements OnInit {
  villain: Villain;

  constructor(
    private route: ActivatedRoute,
    private villainService: VillainService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getVillain();
  }

  getVillain() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.villainService.getById(id)
      .subscribe(villain => this.villain = villain);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.villainService.update(this.villain)
      .subscribe(() => this.goBack());
  }
}
