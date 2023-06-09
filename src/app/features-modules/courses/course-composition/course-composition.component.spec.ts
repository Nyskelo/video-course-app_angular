import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { DurationPipe } from 'src/app/shared/pipes/duration.pipe';
import { action } from 'src/app/utils/global.model';
import { CoursesService } from '../services/courses.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CourseCompositionComponent } from './course-composition.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';

describe('CourseCompositionComponent', () => {
	let component: CourseCompositionComponent;
	let fixture: ComponentFixture<CourseCompositionComponent>;
	let service: CoursesService;
	const mockRouter = {
		navigate: jasmine.createSpy('navigate'),
		url: 'courses/new',
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
			imports: [HttpClientTestingModule],
			declarations: [
				ButtonComponent,
				DurationPipe,
				CourseCompositionComponent,
				InputComponent,
			],
			providers: [
				AuthService,
				{ provide: Router, useValue: mockRouter },
				{ provide: ActivatedRoute, useValue: { data: of({ course: course }) } },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(CourseCompositionComponent);
		component = fixture.componentInstance;
		service = TestBed.inject(CoursesService);
		fixture.detectChanges();
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
			mockRouter.url = 'courses/new';
			service.isUpdating.action = action.ADD;
			service.isUpdating.state = true;
			expect(component.action).toBe(action.ADD);
		});
		it('action getter should return the correct type of action', () => {
			spyOnProperty(component, 'action', 'get').and.callThrough();
			mockRouter.url = 'courses/';
			service.isUpdating.action = action.EDIT;
			service.isUpdating.state = true;
			expect(component.action).toBe(action.EDIT);
		});
		it('state getter should return the correct type of state', () => {
			spyOnProperty(component, 'state', 'get').and.callThrough();
			service.isUpdating.state = true;
			expect(component.state).toBeTruthy();
		});
	});

	describe('onInputTitleValue', async () => {
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
			expect(service.isUpdating.state).toBeFalse();
			expect(service.isUpdating.action).toEqual(action.SAVE);
		});
		it('should trigger service addCourse method when action.ADD', () => {
			spyOn(service, 'addCourse').and.callThrough();
			service.isUpdating.action = action.ADD;
			component.onSave();
			expect(service.addCourse).toHaveBeenCalled();
		});
		it('should trigger service updateCourse method when action.EDIT', () => {
			spyOn(service, 'updateCourse').and.callThrough();
			service.isUpdating.action = action.EDIT;
			component.onSave();
			expect(service.updateCourse).toHaveBeenCalled();
		});
	});
	describe('onCancel', () => {
		beforeEach(() => {
			spyOn(component, 'onCancel').and.callThrough();
			component.onCancel();
		});
		it('should change courses isUpdating state to false and action to action.CANCEL', () => {
			expect(service.isUpdating.state).toBeFalse();
			expect(service.isUpdating.action).toEqual(action.CANCEL);
		});
	});
});
