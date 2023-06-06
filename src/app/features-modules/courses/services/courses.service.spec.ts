import { TestBed } from '@angular/core/testing';
import { mockCourses } from 'src/app/utils/courses-api';
import { action } from 'src/app/utils/global.model';

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
	describe('setCourse', () => {
		it('should add new course if action.ADD', () => {
			const courseToAdd = mockCourses[0];
			service.setCourse(courseToAdd, action.ADD);
			expect(service.getCourseByID(courseToAdd['id'])).toBeDefined();
		});
		it('should update course by ID if action.EDIT', () => {
			const courseToUpdate = mockCourses[0];
			courseToUpdate.name = 'UpdatedCourse';
			service.setCourse(courseToUpdate, action.EDIT);
			expect(mockCourses[0]['name']).toEqual('UpdatedCourse');
		});
	});
});
