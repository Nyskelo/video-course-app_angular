import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
	let component: ButtonComponent;
	let fixture: ComponentFixture<ButtonComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			declarations: [ButtonComponent],
		});
		fixture = TestBed.createComponent(ButtonComponent);
		component = fixture.componentInstance;
	});

	it('can load instance', () => {
		expect(component).toBeTruthy();
	});

	it(`text has default value`, () => {
		expect(component.text).toEqual(`Button`);
	});

	it(`type has default value`, () => {
		expect(component.type).toEqual(`button`);
	});

	it(`bgColor has default value`, () => {
		expect(component.bgColor).toEqual(`#009ECD`);
	});

	it(`textColor has default value`, () => {
		expect(component.textColor).toEqual(`#fff`);
	});

	it(`fontSize has default value`, () => {
		expect(component.fontSize).toEqual(`12px`);
	});
});
