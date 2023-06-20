import { TestBed } from '@angular/core/testing';
import { forwardRef, NO_ERRORS_SCHEMA } from '@angular/core';
import {
	FormsModule,
	NG_VALUE_ACCESSOR,
	ReactiveFormsModule,
} from '@angular/forms';
import { InputReactiveComponent } from './input.component';
import { MatAutocomplete } from '@angular/material/autocomplete';

describe('InputReactiveComponent', () => {
	let component: InputReactiveComponent;

	beforeEach(() => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			declarations: [InputReactiveComponent, MatAutocomplete],
			imports: [ReactiveFormsModule, FormsModule],
			providers: [
				{
					provide: NG_VALUE_ACCESSOR,
					useExisting: forwardRef(() => InputReactiveComponent),
					multi: true,
				},
			],
		});
		component = new InputReactiveComponent();
	});

	describe('input', () => {
		it('input', () => {
			expect(component.name).toEqual('');
		});
	});
});
