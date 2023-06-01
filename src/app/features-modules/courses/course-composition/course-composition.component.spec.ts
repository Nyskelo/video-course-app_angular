import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { DurationPipe } from 'src/app/shared/pipes/duration.pipe';
import { action } from 'src/app/utils/global.model';
import { CoursesService } from '../services/courses.service';

import { CourseCompositionComponent } from './course-composition.component';

describe('CourseCompositionComponent', () => {
	let component: CourseCompositionComponent;
	let fixture: ComponentFixture<CourseCompositionComponent>;
	let serviceSpy: jasmine.SpyObj<CoursesService>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			declarations: [ButtonComponent, DurationPipe, CourseCompositionComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(CourseCompositionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		serviceSpy = TestBed.inject(
			CoursesService
		) as jasmine.SpyObj<CoursesService>;
	});

	describe('onInputTitleValue', () => {
		it('should change title to value passed', () => {
			spyOn(component, 'onInputTitleValue').and.callThrough();
			component.onInputTitleValue('newValue');
			expect(component.title).toEqual('newValue');
		});
	});
	describe('onInputDescriptionValue', () => {
		it('should change title to value passed', () => {
			spyOn(component, 'onInputDescriptionValue').and.callThrough();
			component.onInputDescriptionValue('newValue');
			expect(component.description).toEqual('newValue');
		});
	});
	describe('onInputDurationValue', () => {
		it('should change title to value passed', () => {
			spyOn(component, 'onInputDurationValue').and.callThrough();
			component.onInputDurationValue('120');
			expect(component.duration).toEqual(120);
		});
	});
	describe('onInputDateValue', () => {
		it('should change title to value passed', () => {
			spyOn(component, 'onInputDateValue').and.callThrough();
			component.onInputDateValue('12-12-2023');
			expect(component.date).toEqual('12-12-2023');
		});
	});
	describe('onInputAuthorsValue', () => {
		it('should change title to value passed', () => {
			spyOn(component, 'onInputAuthorsValue').and.callThrough();
			component.onInputAuthorsValue('newAuthors');
			expect(component.authors).toEqual('newAuthors');
		});
	});
	describe('onSave', () => {
		beforeEach(() => {
			spyOn(component, 'onSave').and.callThrough();
			component.onSave();
		});
		it('should change courses isUpdating state to false and action to action.SAVE', () => {
			expect(serviceSpy.isUpdating.state).toBeFalse();
			expect(serviceSpy.isUpdating.action).toEqual(action.SAVE);
		});
		it('should update data', () => {
			spyOn(window, 'alert').and.callThrough();
			expect(window.alert).toHaveBeenCalled();
		});
	});
	describe('onCancel', () => {
		beforeEach(() => {
			spyOn(component, 'onCancel').and.callThrough();
			component.onCancel();
		});
		it('should change courses isUpdating state to false and action to action.CANCEL', () => {
			expect(serviceSpy.isUpdating.state).toBeFalse();
			expect(serviceSpy.isUpdating.action).toEqual(action.CANCEL);
		});
	});
});
