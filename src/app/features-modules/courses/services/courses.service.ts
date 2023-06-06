import { Injectable } from '@angular/core';
import { mockCourses } from 'src/app/utils/courses-api';
import { action, Course, CourseState } from 'src/app/utils/global.model';

@Injectable({
	providedIn: 'root',
})
export class CoursesService {
	courses: Course[] | undefined;
	isUpdating: CourseState = {
		state: false,
		action: action.CANCEL,
	};

	getCourses(): Course[] {
		this.courses = mockCourses;
		return this.courses;
	}
	getCourseByID(id: number): Course | undefined {
		return this.courses?.find((course) => course.id === id);
	}

	removeCourseByID(id: number) {
		this.courses = this.courses?.filter((course) => course.id !== id);
	}
	setCourse(courseToUpdate: Course, passAction: action) {
		if (passAction === action.ADD) {
			this.courses?.push({
				...courseToUpdate,
				id: Date.now(),
			});
		} else {
			this.courses = this.courses?.map((course: Course) =>
				course.id === courseToUpdate.id ? courseToUpdate : course
			);
		}
	}
}
