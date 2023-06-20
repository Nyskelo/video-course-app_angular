import { forwardRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

import { TextareaReactiveComponent } from './textarea.component';

describe('TextareaReactiveComponent', () => {
	let component: TextareaReactiveComponent;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [FormsModule],
			schemas: [NO_ERRORS_SCHEMA],
			declarations: [TextareaReactiveComponent],
			providers: [
				{
					provide: NG_VALUE_ACCESSOR,
					useExisting: forwardRef(() => TextareaReactiveComponent),
					multi: true,
				},
			],
		});

		component = new TextareaReactiveComponent();
	});

	describe('textarea', () => {
		it('textarea', () => {
			expect(component.value).toBe('');
		});
	});
});
