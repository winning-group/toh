import { ComponentFixture, TestBed, async, fakeAsync, tick } from "@angular/core/testing";
import { VillainsComponent } from "./villains.component";
import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { Subject } from "rxjs";

import { VillainService } from "../services/villain.service";
import villains from '../models/villain.mock';
import { By } from "@angular/platform-browser";
import villainMock from "../models/villain.mock";

class VillainServiceStub {
	getVillains = jasmine.createSpy();
	addVillain = jasmine.createSpy();
	deleteVillain = jasmine.createSpy();
}

describe('villains.component.ts', () => {
	let fixture: ComponentFixture<VillainsComponent>;
	let component: VillainsComponent;
	let de: DebugElement;
	let villainService: VillainService;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				VillainsComponent
			],
			schemas: [NO_ERRORS_SCHEMA],
			providers: [
				{provide: VillainService, useClass: VillainServiceStub}
			]
		}).compileComponents();

		fixture = TestBed.createComponent(VillainsComponent);
		component = fixture.componentInstance;
		de = fixture.debugElement;
		villainService = TestBed.get(VillainService);
	});

	it('should be defined', () => {
		expect(component).toBeDefined();
	});

	describe('when the component is initialized', () => {
		const getVillains$ = new Subject();
		let addButtonDe;
		let inputDe;
		beforeEach(() => {
			(villainService.getVillains as jasmine.Spy).and.returnValue(getVillains$);
			fixture.detectChanges();

			addButtonDe = de.query(By.css('button.add'));
			inputDe = de.query(By.css('input'));
		})
		it('should get all villains', () => {
			expect(villainService.getVillains).toHaveBeenCalled();
		});
		it('should render the correct title', () => {
			const h2Content = de.query(By.css('h2')).nativeElement.textContent.trim();
			expect(h2Content).toBe(component.pluralLabel);
		});
		it('should render the name input label', () => {
			const labelContent = de.query(By.css('label')).nativeElement.textContent.trim();
			expect(labelContent).toBe(`${component.singularLabel} name:`);
		});
		it('should render the name input', () => {
			expect(inputDe).toBeDefined();
		})
		it('should render add button', () => {
			expect(addButtonDe).toBeDefined();
		});
		describe('when the user adds a new villain', () => {
			const addVillain$ = new Subject();
			const mockName = 'mock villain';
			beforeEach(() => {
				const inputEl = inputDe.nativeElement;
				const addButtonEl = addButtonDe.nativeElement;
				inputEl.value = mockName;
				inputEl.dispatchEvent(new Event('input'));
				(villainService.addVillain as jasmine.Spy).and.returnValue(addVillain$);
				addButtonEl.click()
				fixture.detectChanges();
			});

			it('should create a new villain with the correct arguments', () => {
				expect((villainService.addVillain as jasmine.Spy).calls.mostRecent().args[0])
				.toEqual({name: mockName})
			});

			describe('when the villain is saved', () => {
				const mockVillain = {
					id: 100,
					name: mockName,
				}
				beforeEach(() => {
					addVillain$.next(mockVillain);
				});
				it('should render it at the bottom of the list', () => {
					fixture.detectChanges();
					const listDe = de.queryAll(By.css('li'))
					const listLastDe = listDe[listDe.length-1];
					expect(+listLastDe.query(By.css('.badge')).nativeElement.textContent.trim())
					.toEqual(mockVillain.id);
				});
			})
		})
		describe('when all villains are resolved', () => {
			let listDe;
			let villainDe;
			let villain;
			beforeEach(() => {
				getVillains$.next(villains)
				fixture.detectChanges();
				listDe = de.queryAll(By.css('li'))
				villainDe = listDe[0];
				villain = villainMock[0];
			});
			it('should render the list properly', () => {
				expect(listDe.length).toEqual(villainMock.length, 'render the full list');
				expect(+villainDe.query(By.css('.badge')).nativeElement.textContent.trim())
				.toEqual(villain.id, 'should render the villain badge correctly');
				expect(villainDe.query(By.css(`a`)).nativeElement.textContent.trim())
				.toEqual(`${villain.id} ${villain.name}`, 'should render a link label correctly');
			});
			describe('when the user deletes one of the villains', () => {
				beforeEach(() => {
					villainDe.query(By.css('button.delete')).nativeElement.click()
					fixture.detectChanges();
				});
				it('should be removed from the list', () => {
					const actualVillainId = +de.queryAll(By.css('li'))[0].query(By.css('.badge')).nativeElement.textContent.trim();
					expect(actualVillainId).not.toEqual(villain.id);
				})
			})
		});
		it('should render delete button', () => {
			const deleteButtonDe = de.query(By.css('button.delete'));
			expect(deleteButtonDe).toBeDefined();
		})
	})

});
