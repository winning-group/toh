import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VillainsComponent } from './villains.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { VILLAINS, HEROES } from '../mock-heroes';
import { VillainsService } from '../shared-services/villains.service';
import { By } from '@angular/platform-browser';
import { Hero } from '../models/hero';


describe('VillainsComponent', () => {
  let component: VillainsComponent;
  let fixture: ComponentFixture<VillainsComponent>;
  let villainsService;
  let getVillainsSpy;
  let el: HTMLElement;
  let heros: Hero[] = HEROES;

  beforeEach(async(() => {
    heros[1].nemesis = {
      id: 21,
      name: 'testVillain'
    };
    villainsService = jasmine.createSpyObj('VillainsService', ['getVillains']);
    getVillainsSpy = villainsService.getVillains.and.returnValue(of(VILLAINS));
    TestBed.configureTestingModule({
      declarations: [VillainsComponent],
      imports: [
        RouterTestingModule.withRoutes([]), HttpClientTestingModule
      ],
      providers: [
        { provide: VillainsService, useValue: villainsService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VillainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have call the deleteVillain methode', async () => {
    fixture.detectChanges();
    spyOn(component, 'deleteVillain');
    el = fixture.debugElement.query(By.css('.delete')).nativeElement;
    el.click();
    expect(component.deleteVillain).toHaveBeenCalledTimes(1);
  });

  it('should call villainService', async(() => {
    expect(getVillainsSpy.calls.any()).toBe(true);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
