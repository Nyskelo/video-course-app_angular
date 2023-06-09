/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { mockCourses } from 'src/app/utils/courses-api';
import { of } from 'rxjs';

describe('CourseListComponent', () => {
	let component: CourseListComponent;
	let fixture: ComponentFixture<CourseListComponent>;
	let service: CoursesService;
	let eventSpy: jasmine.Spy<(this: any) => any>;
	const mockRouter = {
		navigate: jasmine.createSpy('navigate'),
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			imports: [HttpClientTestingModule],
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
		service = TestBed.inject(CoursesService);
		spyOn(console, 'log').and.callThrough();
		spyOn(window, 'confirm').and.callFake(() => true);
		fixture.detectChanges();
	});

	describe('properties', () => {
		beforeEach(() => {
			component.limitToDisplay = 5;
			component.currentPage.set(1);
		});
		it(`startToFetch --> should have an init value equal to limitToDisplay`, () => {
			expect(component.startToFetch()).toBe(component.limitToDisplay);
		});
		it(`startIndex --> should have an init value 0`, () => {
			expect(component.startIndex()).toBe(0);
		});
		it(`endIndex --> should have an init value equal to limitToDisplay`, () => {
			expect(component.endIndex()).toBe(component.limitToDisplay);
		});
		it(`coursesNumeration  --> should start from 1`, () => {
			expect(component.coursesNumeration()).toBe(1);
		});
	});

	describe('ngOnInit', () => {
		describe(`saveOperationSuccessfulSubscription`, () => {
			beforeEach(() => {
				eventSpy = spyOnProperty(
					service as any,
					'saveOperationSuccessfulEvent$',
					'get'
				);
				component.coursesSub$.set(mockCourses);
			});

			it('should add new course if action.ADD', () => {
				const course = Object.assign({}, mockCourses[0], { id: 111000222 });
				const data = { action: action.ADD, id: 111000222 };
				eventSpy.and.returnValue(of(data));
				spyOn(service, 'getCourseByID').and.returnValue(of(course));
				component.ngOnInit();
				service.saveOperationSuccessfulEvent$.subscribe((res) => {
					expect(res).toEqual(data);
				});
			});
			it('should update course if action.EDIT', () => {
				const course = Object.assign({}, mockCourses[0], { name: 'NewTitle' });
				const data = { action: action.EDIT, id: mockCourses[0]['id'] };
				const newCourses = mockCourses
					.filter((e) => e.id !== mockCourses[0]['id'])
					.concat(course);
				eventSpy.and.returnValue(of(data));
				spyOn(service, 'getCourseByID').and.returnValue(of(course));
				component.ngOnInit();
				service.saveOperationSuccessfulEvent$.subscribe((res) => {
					expect(res).toEqual(data);
					service.getCourseByID(res.id).subscribe((e) => {
						expect(component.coursesSub$()).toEqual(newCourses);
					});
				});
			});
			it('should update course if action.DELETE', () => {
				spyOn(service, 'getCourseByID').and.returnValue(of());
				const data = { action: action.DELETE, id: mockCourses[0]['id'] };
				const newCourses = mockCourses.filter(
					(e) => e.id !== mockCourses[0]['id']
				);
				eventSpy.and.returnValue(of(data));
				component.ngOnInit();
				service.saveOperationSuccessfulEvent$.subscribe((res) => {
					expect(res).toEqual(data);
					service.getCourseByID(res.id).subscribe((data) => {
						expect(component.coursesSub$()).toEqual(newCourses);
						expect(data).not.toBeDefined();
					});
				});
			});
		});
	});

	describe('onLoadMore', () => {
		it('should fetch one course', () => {
			spyOn(service, 'getCourses').and.returnValue(of([mockCourses[0]]));
			component.onLoadMore(1);
			expect(component.coursesSub$()).toEqual([mockCourses[0]]);
		});
	});
	describe('onChangePage', () => {
		it('should changed current page if new page passed', () => {
			spyOn(component, 'getCoursesSliceByPage').and.callThrough();
			component.currentPage.set(1);
			component.onChangePage(2);
			expect(component.currentPage()).toEqual(2);
			component.onChangePage(2);
			expect(component.currentPage()).toEqual(2);
		});
	});
	describe('onSearchClick', () => {
		it('should search by passed value', () => {
			spyOn(service, 'searchCourses').and.returnValue(of([mockCourses[0]]));
			component.onSearchClick(mockCourses[0]['name']);
			expect(service.searchCourses).toHaveBeenCalledWith(
				mockCourses[0]['name']
			);
		});
		it('should search by passed value or return init courses if value false', () => {
			spyOn(service, 'searchCourses').and.returnValue(of([mockCourses[0]]));
			spyOn(component, 'initFetchCoursesFromAPI').and.callThrough();
			component.loadMore_disebled = true;
			component.onSearchClick('');
			expect(service.searchCourses).not.toHaveBeenCalled();
			expect(component.initFetchCoursesFromAPI).toHaveBeenCalled();
		});
	});
	describe('initFetchCoursesFromAPI', () => {
		it('initFetchCoursesFromAPI', () => {
			component.coursesSub$.set([]);
			spyOn(component, 'checkAndReturn').and.callThrough();
			spyOn(service, 'getCourses').and.returnValue(of(mockCourses));
			component.initFetchCoursesFromAPI();
			expect(component.coursesSub$()).toEqual(mockCourses);
		});
	});

	describe('onDeleteCourseID', () => {
		it('should log a message when called onDeleteCourseID', () => {
			const course = mockCourses[0];
			component.onDeleteCourse(course);
			expect(window.confirm).toHaveBeenCalled();
		});
	});
	describe('trackCourseID', () => {
		it('should return course id by index', () => {
			expect(component.trackCourseID(0, mockCourses[0])).toBe(
				mockCourses[0]['id']
			);
		});
	});

	describe('onBuildCourse', () => {
		it('should update course if action.ADD', () => {
			spyOn(component, 'onBuildCourse').and.callThrough();
			service.isUpdating.action = action.CANCEL;
			component.onBuildCourse(action.ADD);
			expect(service.isUpdating.action).toEqual(action.ADD);
		});
		it('should add new course if action.EDIT', () => {
			spyOn(component, 'onBuildCourse').and.callThrough();
			service.isUpdating.action = action.CANCEL;
			component.onBuildCourse(action.EDIT);
			expect(service.isUpdating.action).toEqual(action.EDIT);
		});
	});
});
