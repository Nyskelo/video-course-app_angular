import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
	let component: InputComponent;
	let fixture: ComponentFixture<InputComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [FormsModule],
			schemas: [NO_ERRORS_SCHEMA],
			declarations: [InputComponent],
		});
		fixture = TestBed.createComponent(InputComponent);
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
