import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroService } from '../shared-services/hero.service';
import { of } from 'rxjs';
import { HEROES } from '../mock-heroes';
import { By } from '@angular/platform-browser'
import { Villain } from '../models/villains';

describe('HeroesDetailsComponent', () => {
    let component: HeroDetailComponent;
    let fixture: ComponentFixture<HeroDetailComponent>;
    let el: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HeroDetailComponent,

            ],
            providers: [
                FormBuilder,
                HeroService,
            ],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes([]),
                HttpClientTestingModule],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeroDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component['hero'] = {
            id: 11,
            name: '',
            nemesis: {} as Villain
        }
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });


    it('should return falsy validators', async () => {
        component['heroForm'].controls['name'].setValue('');
        expect(component['heroForm'].valid).toBeFalsy();
    });

    it('should return truthy validators', async () => {
        component['heroForm'].controls['name'].setValue('TestName');
        expect(component['heroForm'].valid).toBeTruthy();
    });

    it('should not call the save methode', async () => {
        fixture.detectChanges();
        spyOn(component, 'save');
        el = fixture.debugElement.query(By.css('.save-button')).nativeElement;
        el.click();
        expect(component.save).toHaveBeenCalledTimes(0);
    });

    it('should have call the save methode one time', async () => {
        component['heroForm'].controls['name'].setValue('TestName');
        fixture.detectChanges();
        spyOn(component, 'save');
        el = fixture.debugElement.query(By.css('.save-button')).nativeElement;
        el.click();
        expect(component.save).toHaveBeenCalledTimes(1);
    });

});
