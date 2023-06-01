import { Injectable } from '@angular/core';
import { mockCourses } from 'src/app/utils/courses-api';
import { action, Course, CourseState } from 'src/app/utils/global.model';

@Injectable({
	providedIn: 'root',
})
export class CoursesService {
	// static array
	courses!: Course[] | undefined;
	isUpdating: CourseState = {
		state: false,
		action: action.CANCEL,
	};

	//methods
	getCourses(): Course[] {
		this.courses = mockCourses;
		return this.courses;
	}
	getCourseByID(id: number): Course | undefined {
		return this.courses?.find((course) => course.id === id);
	}
	updateCourseByID(courseToUpdate: Course): void {
		this.courses = this.courses?.map((course) =>
			course.id === courseToUpdate.id ? courseToUpdate : course
		);
	}
	removeCourseByID(id: number) {
		this.courses = this.courses?.filter((course) => course.id !== id);
	}
	createCourse(course: Course) {
		this.courses?.push(course);
	}
}
