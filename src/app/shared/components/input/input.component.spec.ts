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

	it(`type has default value`, () => {
		expect(component.type).toEqual(`text`);
	});

	it(`title has default value`, () => {
		expect(component.title).toEqual(`text`);
	});

	it(`placeholder has default value`, () => {
		expect(component.placeholder).toEqual(`Type here...`);
	});

	it(`heigth has default value`, () => {
		expect(component.heigth).toEqual(`30`);
	});

	it(`width has default value`, () => {
		expect(component.width).toEqual(`200`);
	});

	it('should emit valueChanged when called onChangedValue method', async () => {
		spyOn(component.valueChanged, 'emit');

		component.onChangedValue();

		expect(component.valueChanged.emit).toHaveBeenCalled();
	});
});
