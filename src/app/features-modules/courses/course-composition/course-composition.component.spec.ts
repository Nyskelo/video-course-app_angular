import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { DurationPipe } from 'src/app/shared/pipes/duration.pipe';
import { action } from 'src/app/utils/global.model';
import { CoursesService } from '../services/courses.service';

import { CourseCompositionComponent } from './course-composition.component';

describe('CourseCompositionComponent', () => {
	let component: CourseCompositionComponent;
	let fixture: ComponentFixture<CourseCompositionComponent>;
	let serviceSpy: jasmine.SpyObj<CoursesService>;
	const mockRouter = {
		navigate: jasmine.createSpy('navigate'),
	};
	const course = {
		id: 8693,
		name: 'JavaScript',
		description:
			'Est minim ea aute sunt laborum minim eu excepteur. Culpa sint exercitation mollit enim ad culpa aliquip laborum cillum. Dolor officia culpa labore ex eiusmod ut est ea voluptate ea nostrud.',
		isTopRated: true,
		date: '2023-09-28T04:39:24+00:00',
		authors: [
			{
				id: 1370,
				name: 'Polly',
				lastName: 'Sosa',
			},
		],
		length: 15,
	};

	beforeEach(async () => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			declarations: [ButtonComponent, DurationPipe, CourseCompositionComponent],
			providers: [
				AuthService,
				{ provide: Router, useValue: mockRouter },
				{ provide: ActivatedRoute, useValue: { data: of({ course: course }) } },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(CourseCompositionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		serviceSpy = TestBed.inject(
			CoursesService
		) as jasmine.SpyObj<CoursesService>;
	});

	describe('ngOnInit', () => {
		it('ngOnInit', () => {
			spyOn(component, 'ngOnInit').and.callThrough();
			component.ngOnInit();
			expect(component.ngOnInit).toHaveBeenCalled();
		});
	});

	describe('getters', () => {
		it('action getter should return the correct type of action', () => {
			spyOnProperty(component, 'action', 'get').and.callThrough();
			serviceSpy.isUpdating.action = action.ADD;
			serviceSpy.isUpdating.state = true;
			expect(component.action).toBe(action.ADD);
		});
		it('state getter should return the correct type of state', () => {
			spyOnProperty(component, 'state', 'get').and.callThrough();
			serviceSpy.isUpdating.state = true;
			expect(component.state).toBeTruthy();
		});
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
