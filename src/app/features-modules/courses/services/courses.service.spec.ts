import { TestBed } from '@angular/core/testing';
import { mockCourses } from 'src/app/utils/courses-api';
import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';

import { CoursesService } from './courses.service';
import { action } from 'src/app/utils/global.model';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { mockAuthors } from 'src/app/utils/authors-api';

describe('CoursesService', () => {
	let service: CoursesService;
	let httpController: HttpTestingController;
	let httpClientSpy: jasmine.SpyObj<HttpClient>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
		});
		service = TestBed.inject(CoursesService);
		httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
		httpController = TestBed.inject(HttpTestingController);
		service.courses = mockCourses;
		spyOn(console, 'log').and.callThrough();
	});
	afterEach(() => httpController.verify());

	describe('saveOperationSuccessfulEvent$', () => {
		it('should return value', () => {
			spyOnProperty(service, 'saveOperationSuccessfulEvent$', 'get')
				.and.returnValue(
					of({
						action: action.ADD,
						course: mockCourses[0],
					})
				)
				.and.callThrough();

			service.saveOperationSuccessfulEvent$.subscribe((data) => {
				expect(data).toEqual({
					action: action.ADD,
					course: mockCourses[0],
				});
			});
		});
	});

	describe('searchResultSubject$', () => {
		it('should return value', () => {
			spyOnProperty(service, 'searchResultSubject$', 'get')
				.and.returnValue(of('Msg'))
				.and.callThrough();
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(service as any)._searchResultSubject$.next('Msg');
			service.searchResultSubject$.subscribe((data) => {
				expect(data).toEqual('Msg');
			});
		});
	});

	describe('getCourseByID', () => {
		it('should return course by ID', (done: DoneFn) => {
			service.getCourseByID(mockCourses[0]['id']).subscribe((data) => {
				expect(data).toEqual(mockCourses[0]);
				expect(console.log).toHaveBeenCalled();
				done();
			});
			httpController
				.expectOne({
					method: 'GET',
					url: `http://localhost:3004/courses/${mockCourses[0]['id']}`,
				})
				.flush(mockCourses[0]);
		});
	});
	describe('getCourses', () => {
		it('should return second course based on the parameters', (done: DoneFn) => {
			service.getCourses(1, 1).subscribe((data) => {
				expect(data).toEqual(mockCourses[1]);
				expect(console.log).toHaveBeenCalled();
				done();
			});
			httpController
				.expectOne({
					method: 'GET',
					url: `http://localhost:3004/courses?sort=date&start=1&count=1`,
				})
				.flush(mockCourses[1]);
		});
		it('should return all courses if params start and count not present', (done: DoneFn) => {
			service.getCourses().subscribe((data) => {
				expect(data).toEqual(mockCourses);
				expect(console.log).toHaveBeenCalled();
				done();
			});
			httpController
				.expectOne({
					method: 'GET',
					url: `http://localhost:3004/courses?sort=date`,
				})
				.flush(mockCourses);
		});
		it('should set _saveOperationSuccessfulEvent$ action to EMPTY', (done: DoneFn) => {
			httpClientSpy.get.and.returnValue(of([]));
			service.getCourses().subscribe((data) => {
				expect(data).toEqual([]);
				expect(console.log).toHaveBeenCalled();
				done();
			});
			httpController
				.expectOne({
					method: 'GET',
					url: `http://localhost:3004/courses?sort=date`,
				})
				.flush([]);
		});
	});
	describe('addCourse', () => {
		it('should add new course', (done: DoneFn) => {
			const data = Object.assign({}, mockCourses[0], { id: 111000222 });
			service.addCourse(data).subscribe(() => {
				expect(console.log).toHaveBeenCalled();
				done();
			});
			httpController
				.expectOne({
					method: 'POST',
					url: `http://localhost:3004/courses`,
				})
				.flush(data);
		});
	});
	describe('updateCourse', () => {
		it('should update course', (done: DoneFn) => {
			const data = Object.assign({}, mockCourses[0], { name: 'New Title' });
			service.updateCourse(data).subscribe(() => {
				expect(console.log).toHaveBeenCalled();
				done();
			});
			httpController
				.expectOne({
					method: 'PUT',
					url: `http://localhost:3004/courses/${mockCourses[0]['id']}`,
				})
				.flush(data);
		});
	});
	describe('deleteCourse', () => {
		it('should delete course', (done: DoneFn) => {
			service.deleteCourse(mockCourses[0]).subscribe(() => {
				expect(console.log).toHaveBeenCalled();
				done();
			});
			httpController
				.expectOne({
					method: 'DELETE',
					url: `http://localhost:3004/courses/${mockCourses[0]['id']}`,
				})
				.flush(mockCourses[0]);
		});
	});
	describe('searchCourses', () => {
		it('should searchCourses', (done: DoneFn) => {
			const dataSearch = Object.assign({}, mockCourses[0], {
				name: 'ABCDSDFG',
			});
			service.searchCourses('ABCDSDFG').subscribe((data) => {
				expect(data).toEqual(dataSearch);
				done();
			});
			httpController
				.expectOne({
					method: 'GET',
					url: `http://localhost:3004/courses?sort=date&textFragment=ABCDSDFG`,
				})
				.flush(dataSearch);
		});
		it('should searchCourses', (done: DoneFn) => {
			service.searchCourses('______ABCDSDFG_____').subscribe((data) => {
				expect(data).toEqual([]);
				done();
			});
			httpController
				.expectOne({
					method: 'GET',
					url: `http://localhost:3004/courses?sort=date&textFragment=______ABCDSDFG_____`,
				})
				.flush([]);
		});
	});
	describe('getAuthors', () => {
		it('should fetch all authors', (done: DoneFn) => {
			service.getAuthors().subscribe((data) => {
				expect(data).toEqual(mockAuthors);
				expect(console.log).toHaveBeenCalled();
				done();
			});
			httpController
				.expectOne({
					method: 'GET',
					url: `http://localhost:3004/authors`,
				})
				.flush(mockAuthors);
		});
		it('should return []', (done: DoneFn) => {
			service.getAuthors().subscribe((data) => {
				expect(data).toEqual([]);
				expect(console.log).toHaveBeenCalled();
				done();
			});
			httpController
				.expectOne({
					method: 'GET',
					url: `http://localhost:3004/authors`,
				})
				.flush([]);
		});
	});
	describe('addAuthor', () => {
		it('should add new author', (done: DoneFn) => {
			const data = Object.assign({}, mockAuthors[0], { id: 111000222 });
			service.addAuthor(data).subscribe(() => {
				expect(console.log).toHaveBeenCalled();
				done();
			});
			httpController
				.expectOne({
					method: 'POST',
					url: `http://localhost:3004/authors`,
				})
				.flush(data);
		});
	});
	describe('deleteAuthor', () => {
		it('should delete author', (done: DoneFn) => {
			service.deleteAuthor(mockAuthors[0]).subscribe(() => {
				expect(console.log).toHaveBeenCalled();
				done();
			});
			httpController
				.expectOne({
					method: 'DELETE',
					url: `http://localhost:3004/authors/${mockAuthors[0]['id']}`,
				})
				.flush(mockAuthors[0]);
		});
	});
});
