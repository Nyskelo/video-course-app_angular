import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbarComponent } from './searchbar.component';
import { InputComponent } from '../input/input.component';
import { FormsModule } from '@angular/forms';

describe('SearchbarComponent', () => {
	let component: SearchbarComponent;
	let fixture: ComponentFixture<SearchbarComponent>;
	let el: DebugElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SearchbarComponent, InputComponent],
			imports: [FormsModule],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(SearchbarComponent);
		component = fixture.componentInstance;
		el = fixture.debugElement;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should be called onInputValueChanged when inputEvent occurs', () => {
		spyOn(component, 'onInputValueChanged').and.callThrough();

		const input = el.nativeElement.querySelector('app-input').children[0];

		input.dispatchEvent(new Event('input'));

		expect(component.onInputValueChanged).toHaveBeenCalled();
	});

	it('should emit searchTextChanged when called onSearchTextChanged method', async () => {
		fixture.detectChanges();
		spyOn(component.searchTextChanged, 'emit');

		component.onSearchTextChanged();

		expect(component.searchTextChanged.emit).toHaveBeenCalled();
	});
});
