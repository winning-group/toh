import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { HeroService } from 'core/services';
import { HeroSearchComponent } from 'shared/components/hero-search/hero-search.component';
import { HEROES } from 'shared/utils/test/mock-heroes';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let heroService;
  let getHeroesSpy;

  beforeEach(async(() => {
    heroService = jasmine.createSpyObj('HeroService', ['getHeroes']);
    getHeroesSpy = heroService.getHeroes.and.returnValue(of(HEROES));
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        HeroSearchComponent,
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: HeroService, useValue: heroService },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Top Heroes" as headline', () => {
    expect(fixture.nativeElement.querySelector('h2').textContent).toEqual('Top Heroes');
  });

  it('should call heroService', async(() => {
    expect(getHeroesSpy.calls.any()).toBe(true);
  }));

  it('should display 4 links', async(() => {
    expect(fixture.nativeElement.querySelectorAll('a').length).toEqual(4);
  }));
});
