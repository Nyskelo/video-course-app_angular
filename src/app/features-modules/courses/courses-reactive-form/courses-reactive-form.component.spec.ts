/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CoursesReactiveFormComponent } from './courses-reactive-form.component';

describe('CoursesReactiveFormComponent', () => {
	let component: CoursesReactiveFormComponent;
	let fixture: ComponentFixture<CoursesReactiveFormComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CoursesReactiveFormComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CoursesReactiveFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
