import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VillainsComponent } from './villains.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VillainsComponent', () => {
  let component: VillainsComponent;
  let fixture: ComponentFixture<VillainsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VillainsComponent],
      imports: [
        RouterTestingModule.withRoutes([]), HttpClientTestingModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VillainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
