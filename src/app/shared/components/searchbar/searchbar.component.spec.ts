import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbarComponent } from './searchbar.component';
import { InputComponent } from '../input/input.component';
import { FormsModule } from '@angular/forms';

describe('SearchbarComponent', () => {
	let component: SearchbarComponent;
	let fixture: ComponentFixture<SearchbarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SearchbarComponent, InputComponent],
			imports: [FormsModule],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(SearchbarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be called onInputValueChanged when inputEvent occurs', () => {
		component.onInputValueChanged('Value');
		expect(component.enteredSearchValue).toBe('Value');
	});

	it('should emit searchTextChanged when called onSearchTextChanged method', async () => {
		fixture.detectChanges();
		spyOn(component.searchTextChanged, 'emit');

		component.onSearchTextChanged();

		expect(component.searchTextChanged.emit).toHaveBeenCalled();
	});
});
