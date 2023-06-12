/* eslint-disable @typescript-eslint/no-explicit-any */
import { Course } from 'src/app/utils/global.model';
import { createReducer, on } from '@ngrx/store';
import * as CoursesAction from './actions';

export interface CoursesStateInterface {
	isLoading: boolean;
	courses: Course[];
	error: string | null;
}
export const initStateCourses: CoursesStateInterface = {
	isLoading: false,
	courses: [],
	error: null,
};

export const reducers = createReducer(
	initStateCourses,
	//Get courses
	on(CoursesAction.getCourses, (state) => ({
		...state,
		isLoading: true,
	})),
	on(CoursesAction.getCoursesSuccess, (state, action) => ({
		...state,
		isLoading: false,
		courses: !action.start
			? action.courses
			: [...state.courses, ...action.courses],
	})),
	on(CoursesAction.getCoursesFailure, (state, action) => ({
		...state,
		isLoading: false,
		error: action.error,
	})),

	//Delete course
	on(CoursesAction.deleteCourse, (state) => ({
		...state,
		isLoading: true,
	})),
	on(CoursesAction.deleteCourseSuccess, (state, action) => ({
		...state,
		isLoading: false,
		courses: state.courses.filter((course) => course.id !== action.course.id),
	})),
	on(CoursesAction.deleteCourseFailure, (state, action) => ({
		...state,
		isLoading: false,
		error: action.error,
	})),

	//Update course
	on(CoursesAction.updateCourse, (state) => ({
		...state,
		isLoading: true,
	})),
	on(CoursesAction.updateCourseSuccess, (state, action) => ({
		...state,
		isLoading: false,
		courses: state.courses.map((course) => {
			if (course.id === action.course.id) {
				return action.course;
			} else {
				return course;
			}
		}),
	})),
	on(CoursesAction.updateCourseFailure, (state, action) => ({
		...state,
		isLoading: false,
		error: action.error,
	})),

	//Add course
	on(CoursesAction.addCourse, (state) => ({
		...state,
		isLoading: true,
	})),
	on(CoursesAction.addCourseSuccess, (state, action) => ({
		...state,
		isLoading: false,
		courses: [...state.courses, action.course],
	})),
	on(CoursesAction.addCourseFailure, (state, action) => ({
		...state,
		isLoading: false,
		error: action.error,
	})),

	//Search courses
	on(CoursesAction.searchCourses, (state) => ({
		...state,
		isLoading: true,
	})),
	on(CoursesAction.searchCoursesSuccess, (state, action) => ({
		...state,
		isLoading: false,
		courses: action.courses,
	})),
	on(CoursesAction.searchCoursesFailure, (state, action) => ({
		...state,
		isLoading: false,
		error: action.error,
	}))
);
