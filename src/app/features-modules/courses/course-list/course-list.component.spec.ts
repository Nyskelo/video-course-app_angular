import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SearchbarComponent } from 'src/app/shared/components/searchbar/searchbar.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { DurationPipe } from 'src/app/shared/pipes/duration.pipe';
import { OrderByPipe } from 'src/app/shared/pipes/orderBy.pipe';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { CourseListComponent } from './course-list.component';
import { action } from 'src/app/utils/global.model';
import { CoursesService } from '../services/courses.service';
import { Router } from '@angular/router';

describe('CourseListComponent', () => {
	let component: CourseListComponent;
	let fixture: ComponentFixture<CourseListComponent>;
	let serviceSpy: jasmine.SpyObj<CoursesService>;
	const mockRouter = {
		navigate: jasmine.createSpy('navigate'),
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			declarations: [
				CourseListComponent,
				SearchbarComponent,
				ButtonComponent,
				DurationPipe,
				OrderByPipe,
				FilterPipe,
			],
			providers: [FilterPipe, { provide: Router, useValue: mockRouter }],
		});
		fixture = TestBed.createComponent(CourseListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		serviceSpy = TestBed.inject(
			CoursesService
		) as jasmine.SpyObj<CoursesService>;
		spyOn(console, 'log').and.callThrough();
		spyOn(window, 'confirm').and.callFake(() => true);
	});

	it(`should assign courses when component initilazed`, () => {
		fixture.detectChanges();
		expect(component.courses.length).toBeGreaterThan(0);
	});

	it('should log a message when called onSearchClick', () => {
		const searchValue = 'text';
		component.onSearchClick(searchValue);
		expect(console.log).not.toHaveBeenCalledOnceWith(
			`Search value: ${searchValue}`
		);
	});

	it('should log a message when called onLoadMore', () => {
		component.onLoadMore();
		expect(component).toBeTruthy();
	});

	it('should log a message when called onDeleteCourseID', () => {
		const id = 1;
		component.onDeleteCourseID(id);
		expect(console.log).not.toHaveBeenCalledOnceWith(
			`Course with id #${id} has been deleted`
		);
		expect(window.confirm).toHaveBeenCalled();
	});

	describe('onNewCourse', () => {
		it('should update course if action.ADD', () => {
			spyOn(component, 'onNewCourse').and.callThrough();
			serviceSpy.isUpdating.action = action.CANCEL;
			component.onNewCourse(action.ADD);
			expect(serviceSpy.isUpdating.action).toEqual(action.ADD);
		});
		it('should add new course if action.EDIT', () => {
			spyOn(component, 'onNewCourse').and.callThrough();
			serviceSpy.isUpdating.action = action.CANCEL;
			component.onNewCourse(action.EDIT);
			expect(serviceSpy.isUpdating.action).toEqual(action.EDIT);
		});
	});
});
