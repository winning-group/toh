import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { VillainDetailComponent } from './villain-detail.component';

describe('VillainDetailComponent', () => {
  let component: VillainDetailComponent;
  let fixture: ComponentFixture<VillainDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VillainDetailComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VillainDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
