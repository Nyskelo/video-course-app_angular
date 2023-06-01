import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TextareaComponent } from './textarea.component';

describe('TextareaComponent', () => {
	let component: TextareaComponent;
	let fixture: ComponentFixture<TextareaComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [FormsModule],
			schemas: [NO_ERRORS_SCHEMA],
			declarations: [TextareaComponent],
		});

		fixture = TestBed.createComponent(TextareaComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	describe('onChangedValue', () => {
		it('should emit valueChanged when called onChangedValue method', async () => {
			spyOn(component.valueChanged, 'emit');
			component.onChangedValue();
			expect(component.valueChanged.emit).toHaveBeenCalled();
		});
	});
});
