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

	describe('onInputValueChanged', () => {
		it('should changed enteredSearchValue to "NewValue"', () => {
			spyOn(component.searchTextChanged, 'emit');
			component.onInputValueChanged('NewValue');
			expect(component.searchTextChanged.emit).toHaveBeenCalledWith('NewValue');
		});
	});
	describe('onClear', () => {
		it('should reset input value', () => {
			spyOn(component.childInput.valueChanged, 'emit');
			component.onClear();
			expect(component.childInput.valueChanged.emit).toHaveBeenCalledWith('');
		});
	});
});
