/* tslint:disable:no-unused-variable */
import { AsyncPipe, NgFor } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	MatAutocomplete,
	MatAutocompleteModule,
	MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { InputReactiveComponent } from 'src/app/shared/components/input_reactive/input.component';
import { TextareaReactiveComponent } from 'src/app/shared/components/textarea-reactive/textarea.component';
import { DurationPipe } from 'src/app/shared/pipes/duration.pipe';
import { initStateAuthors } from 'src/app/store/authors/reducers';
import { initStateCourses } from 'src/app/store/courses/reducers';
import { initStateUser } from 'src/app/store/user/reducers';
import { mockAuthors } from 'src/app/utils/authors-api';
import { action } from 'src/app/utils/global.model';
import { CoursesService } from '../services/courses.service';

import { CoursesReactiveFormComponent } from './courses-reactive-form.component';

describe('CoursesReactiveFormComponent', () => {
	let component: CoursesReactiveFormComponent;
	let fixture: ComponentFixture<CoursesReactiveFormComponent>;
	let service: CoursesService;
	let store: MockStore;
	// let fb: FormBuilder;

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
	// const testStore = jasmine.createSpyObj('Store', ['dispatch']);

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			imports: [
				HttpClientTestingModule,
				FormsModule,
				MatFormFieldModule,
				MatChipsModule,
				NgFor,
				MatIconModule,
				MatAutocompleteModule,
				ReactiveFormsModule,
				AsyncPipe,
				NoopAnimationsModule,
			],
			declarations: [
				ButtonComponent,
				DurationPipe,
				CoursesReactiveFormComponent,
				InputReactiveComponent,
				TextareaReactiveComponent,
				MatAutocomplete,
			],
			providers: [
				AuthService,
				FormBuilder,
				provideMockStore({
					initialState: {
						courses: initStateCourses,
						user: initStateUser,
						authors: initStateAuthors,
					},
				}),
				{ provide: Router, useValue: mockRouter },
				{ provide: ActivatedRoute, useValue: { data: of({ course: course }) } },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(CoursesReactiveFormComponent);
		component = fixture.componentInstance;
		service = TestBed.inject(CoursesService);
		store = TestBed.inject(MockStore);
		// fb = TestBed.inject(FormBuilder);
		fixture.detectChanges();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CoursesReactiveFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
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
	describe('onSave', () => {
		beforeEach(() => {
			spyOn(component, 'onSave').and.callThrough();
			component.onSave();
		});
		it('should change courses isUpdating state to false and action to action.SAVE', () => {
			expect(service.isUpdating.state).toBeFalse();
			expect(service.isUpdating.action).toEqual(action.SAVE);
		});
		it('should trigger store.dispatch to add course', () => {
			spyOn(store, 'dispatch').and.callThrough();
			service.isUpdating.action = action.ADD;
			component.onSave();
			expect(store.dispatch).toHaveBeenCalled();
		});
		it('should trigger store.dispatch to update course', () => {
			spyOn(store, 'dispatch').and.callThrough();
			service.isUpdating.action = action.EDIT;
			component.onSave();
			expect(store.dispatch).toHaveBeenCalled();
		});
		it('should return null', () => {
			spyOn(store, 'dispatch').and.callThrough();
			component.authorsArray.set([]);
			component.onSave();
			expect(store.dispatch).not.toHaveBeenCalled();
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
	describe('Chips-autocomplete methods', () => {
		it('_filter', () => {
			component.allAuthors.set(mockAuthors);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			expect((component as any)._filter(mockAuthors[0]['name'])).toEqual([
				mockAuthors[0],
			]);
		});
		it('remove', () => {
			component.authorsArray.set(mockAuthors.slice(0, 2));
			component.remove(mockAuthors[0]);
			expect(component.authorsArray()).toEqual([mockAuthors[1]]);
		});
		it('selected', () => {
			component.authorsArray.set([]);
			const mockEvent: MatAutocompleteSelectedEvent = <
				MatAutocompleteSelectedEvent // eslint-disable-next-line @typescript-eslint/no-explicit-any
			>(<any>{
				option: {
					value: { name: 'Name', id: 1111 },
				},
			});
			component.selected(mockEvent);
			expect(component.authorsArray()).toEqual([{ name: 'Name', id: 1111 }]);
		});
		it('add ---> valid: should be added', () => {
			component.authorsArray.set([]);
			const mockEvent: MatChipInputEvent = <
				MatChipInputEvent // eslint-disable-next-line @typescript-eslint/no-explicit-any
			>(<any>{
				value: 'name name',
				chipInput: { inputElement: { value: 'name name' } },
			});
			component.authors?.setErrors({ customValidation: false });
			component.add(mockEvent);
			expect(component.authorsArray()[0]['name']).toEqual('name name');
		});
		it('add ---> partial valid: should not be added', () => {
			component.authorsArray.set([]);
			const mockEvent: MatChipInputEvent = <
				MatChipInputEvent // eslint-disable-next-line @typescript-eslint/no-explicit-any
			>(<any>{
				value: 'name',
			});
			component.authors?.setErrors({ customValidation: true });
			component.add(mockEvent);
			expect(component.authorsArray()).toEqual([]);
		});
		it('add ---> invalid: should not be added', () => {
			component.authorsArray.set([]);
			const mockEvent: MatChipInputEvent = <
				MatChipInputEvent // eslint-disable-next-line @typescript-eslint/no-explicit-any
			>(<any>{
				value: '',
			});
			component.authors?.setErrors({ customValidation: true });
			component.add(mockEvent);
			expect(component.authorsArray()).toEqual([]);
		});
	});
});
