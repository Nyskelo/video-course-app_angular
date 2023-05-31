import { TestBed } from '@angular/core/testing';
import { mockCourses } from 'src/app/utils/courses-api';

import { CoursesService } from './courses.service';

describe('CoursesService', () => {
	let service: CoursesService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = new CoursesService();
		service.courses = mockCourses;
	});

	describe('getCourseByID', () => {
		it('should return course by ID', () => {
			expect(service.getCourseByID(mockCourses[0]['id'])).toEqual(
				mockCourses[0]
			);
		});
	});
	describe('updateCourseByID', () => {
		it('should update course by ID', () => {
			const courseToUpdate = mockCourses[0];
			courseToUpdate.name = 'UpdatedCourse';
			service.updateCourseByID(courseToUpdate);
			expect(mockCourses[0]['name']).toEqual('UpdatedCourse');
		});
	});
	describe('createCourse', () => {
		it('should add a new course', () => {
			const newCourse = mockCourses[0];
			newCourse.id = 1111;
			service.createCourse(newCourse);
			expect(service.getCourseByID(1111)).toBeDefined();
		});
	});
});
