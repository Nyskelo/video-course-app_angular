import { createAction, props } from '@ngrx/store';
import { Course } from 'src/app/utils/global.model';

//get Courses
export const getCourses = createAction(
	'[Courses] Get Courses',
	props<{ start?: number; count?: number }>()
);
export const getCoursesSuccess = createAction(
	'[Courses] Get Courses success',
	props<{ courses: Course[]; start: number }>()
);
export const getCoursesFailure = createAction(
	'[Courses] Get Courses failure',
	props<{ error: string }>()
);

//delete Course
export const deleteCourse = createAction(
	'[Course] Delete Course',
	props<{ course: Course }>()
);
export const deleteCourseSuccess = createAction(
	'[Course] Delete Course success',
	props<{ course: Course }>()
);
export const deleteCourseFailure = createAction(
	'[Course] Delete Course failure',
	props<{ error: string }>()
);

//Update Course
export const updateCourse = createAction(
	'[Course] Update Course',
	props<{ course: Course }>()
);
export const updateCourseSuccess = createAction(
	'[Course] Update Course success',
	props<{ course: Course }>()
);
export const updateCourseFailure = createAction(
	'[Course] Update Course failure',
	props<{ error: string }>()
);

//Add Course
export const addCourse = createAction(
	'[Course] Add Course',
	props<{ course: Course }>()
);
export const addCourseSuccess = createAction(
	'[Course] Add Course success',
	props<{ course: Course }>()
);
export const addCourseFailure = createAction(
	'[Course] Add Course failure',
	props<{ error: string }>()
);

//Search Course
export const searchCourses = createAction(
	'[Courses] Search Courses',
	props<{ term: string }>()
);
export const searchCoursesSuccess = createAction(
	'[Courses] Search Courses success',
	props<{ courses: Course[] }>()
);
export const searchCoursesFailure = createAction(
	'[Courses] Search Courses failure',
	props<{ error: string }>()
);
