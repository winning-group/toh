import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VillainDetailComponent } from './villain-detail.component';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HeroService } from '../shared-services/hero.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VillainDetailComponent', () => {
  let component: VillainDetailComponent;
  let fixture: ComponentFixture<VillainDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VillainDetailComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]), HttpClientTestingModule
      ],
      providers: [
        FormBuilder,
        HeroService,
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
