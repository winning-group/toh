import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VillainDetailComponent } from './villain-detail.component';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HeroService } from '../shared-services/hero.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('VillainDetailComponent', () => {
  let component: VillainDetailComponent;
  let fixture: ComponentFixture<VillainDetailComponent>;
  let el: HTMLElement;

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
    component['villain'] = {
      id: 99,
      name: "testVillain"
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have call the saveVillain one time', async () => {
    fixture.detectChanges();
    spyOn(component, 'saveVillain');
    el = fixture.debugElement.query(By.css('#save-villain')).nativeElement;
    el.click();
    expect(component.saveVillain).toHaveBeenCalledTimes(1);
  });

  it('should not have call the saveVillain', async () => {
    component['villain'] = {
      id: 99,
      name: ""
    }
    fixture.detectChanges();
    spyOn(component, 'saveVillain');
    el = fixture.debugElement.query(By.css('#save-villain')).nativeElement;
    el.click();
    expect(component.saveVillain).toHaveBeenCalledTimes(0);
  });

});
