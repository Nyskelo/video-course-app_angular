import { Injectable } from '@angular/core';
import { mockCourses } from 'src/app/utils/courses-api';
import { Course } from 'src/app/utils/global.model';

@Injectable({
	providedIn: 'root',
})
export class CoursesService {
	courses: Course[] = mockCourses;

	getCourses(): Course[] {
		return this.courses;
	}
}
