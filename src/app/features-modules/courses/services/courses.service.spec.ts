import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { mockCourses } from 'src/app/utils/courses-api';
import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';

import { CoursesService } from './courses.service';

describe('CoursesService', () => {
	let service: CoursesService;
	let httpController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
		});
		service = TestBed.inject(CoursesService);
		httpController = TestBed.inject(HttpTestingController);
		service.courses = mockCourses;
		spyOn(console, 'log').and.callThrough();
	});
	afterEach(() => httpController.verify());

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
				expect(console.log).toHaveBeenCalled();
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
			service.searchCourses('______ABCDSDFG_____').subscribe(() => {
				expect(console.log).toHaveBeenCalledWith(
					'no courses matching "______ABCDSDFG_____"'
				);
				done();
			});
			httpController
				.expectOne({
					method: 'GET',
					url: `http://localhost:3004/courses?sort=date&textFragment=______ABCDSDFG_____`,
				})
				.flush(of({}));
		});
	});
});
