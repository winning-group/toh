import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { VillainService } from 'core/services';
import { VILLAINS } from 'shared/utils/test/mock-villains';
import { VillainsComponent } from './villains.component';

describe('VillainsComponent', () => {
  let component: VillainsComponent;
  let fixture: ComponentFixture<VillainsComponent>;
  let villainService;
  let getVillainsSpy;

  beforeEach(async(() => {
    villainService = jasmine.createSpyObj('VillainService', ['getVillains']);
    getVillainsSpy = villainService.getVillains.and.returnValue(of(VILLAINS));
    TestBed.configureTestingModule({
      declarations: [VillainsComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: VillainService, useValue: villainService },
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

  it('should call villainService', async(() => {
    expect(getVillainsSpy.calls.any()).toBe(true);
  }));
});
