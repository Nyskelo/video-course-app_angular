/* eslint-disable @typescript-eslint/no-explicit-any */
import { mockCourses } from 'src/app/utils/courses-api';
import { Course } from 'src/app/utils/global.model';
import * as CoursesAction from './actions';
import * as fromMyReducers from './reducers';

let error!: null;
const state = fromMyReducers.initStateCourses;
const fullCoursesState = { ...state, courses: mockCourses };

describe('Reduser: Courses', () => {
	describe('Get Courses', () => {
		it('should set isLoading to true', () => {
			const expected = { ...state, isLoading: true };
			const action = CoursesAction.getCourses;
			expect(fromMyReducers.coursesReducers(undefined, action)).toEqual(
				expected
			);
		});
		it('Success --> should fetch all courses', () => {
			let courses!: Course[];
			const expected = { ...state, isLoading: false, courses: courses };
			const action = CoursesAction.getCoursesSuccess;
			expect(fromMyReducers.coursesReducers(undefined, action)).toEqual(
				expected
			);
		});
		it('Success --> should fetch courses and concat with oldState ', () => {
			const oldState = { ...state, courses: [mockCourses[0]] };
			const action = CoursesAction.getCoursesSuccess({
				courses: [mockCourses[1]],
				start: 1,
			});
			const expected = {
				...oldState,
				isLoading: false,
				courses: [...oldState.courses, mockCourses[1]],
			};
			expect(fromMyReducers.coursesReducers(oldState, action)).toEqual(
				expected
			);
		});
		it('Success --> should fetch courses without old state.courses if "state" props false', () => {
			const action = CoursesAction.getCoursesSuccess({
				courses: [mockCourses[0]],
				start: 0,
			});
			const expected = {
				...state,
				isLoading: false,
				courses: [mockCourses[0]],
			};
			expect(fromMyReducers.coursesReducers(undefined, action)).toEqual(
				expected
			);
		});
		it('Failure --> should set error to null', () => {
			const expected = { ...state, error: error };
			const action = CoursesAction.getCoursesFailure;
			expect(fromMyReducers.coursesReducers(undefined, action)).toEqual(
				expected
			);
		});
	});
	describe('Add Courses', () => {
		it('should set isLoading to true', () => {
			const expected = { ...state, isLoading: true };
			const action = CoursesAction.addCourse;
			expect(fromMyReducers.coursesReducers(undefined, action)).toEqual(
				expected
			);
		});
		it('Success --> should add new course', () => {
			const mockCourse = Object.assign({}, mockCourses[0], { id: 111 });
			const expected = {
				...state,
				isLoading: false,
				courses: [...state.courses, mockCourse],
			};
			const action = CoursesAction.addCourseSuccess({ course: mockCourse });
			expect(fromMyReducers.coursesReducers(undefined, action)).toEqual(
				expected
			);
		});
		it('Failure --> should set error to null', () => {
			const expected = { ...state, error: error };
			const action = CoursesAction.addCourseFailure;
			expect(fromMyReducers.coursesReducers(undefined, action)).toEqual(
				expected
			);
		});
	});
	describe('Update Courses', () => {
		it('should set isLoading to true', () => {
			const expected = { ...fullCoursesState, isLoading: true };
			const action = CoursesAction.updateCourse;
			expect(fromMyReducers.coursesReducers(fullCoursesState, action)).toEqual(
				expected
			);
		});
		it('Success --> should update course', () => {
			const mockCourse = Object.assign({}, mockCourses[0], {
				name: 'NewTitle',
			});
			const expected = {
				...fullCoursesState,
				isLoading: false,
				courses: [
					...fullCoursesState.courses.map((course) => {
						if (course.id === mockCourse.id) {
							return mockCourse;
						} else {
							return course;
						}
					}),
				],
			};
			const action = CoursesAction.updateCourseSuccess({ course: mockCourse });
			expect(fromMyReducers.coursesReducers(fullCoursesState, action)).toEqual(
				expected
			);
		});
		it('Failure --> should set error to null', () => {
			const expected = { ...state, error: error };
			const action = CoursesAction.updateCourseFailure;
			expect(fromMyReducers.coursesReducers(undefined, action)).toEqual(
				expected
			);
		});
	});
	describe('Search Courses', () => {
		it('should set isLoading to true', () => {
			const expected = { ...fullCoursesState, isLoading: true };
			const action = CoursesAction.searchCourses;
			expect(fromMyReducers.coursesReducers(fullCoursesState, action)).toEqual(
				expected
			);
		});
		it('Success --> should search course', () => {
			const expected = {
				...fullCoursesState,
				isLoading: false,
				courses: [mockCourses[0]],
			};
			const action = CoursesAction.searchCoursesSuccess({
				courses: [mockCourses[0]],
			});
			expect(fromMyReducers.coursesReducers(fullCoursesState, action)).toEqual(
				expected
			);
		});
		it('Failure --> should set error to null', () => {
			const expected = { ...state, error: error };
			const action = CoursesAction.searchCoursesFailure;
			expect(fromMyReducers.coursesReducers(undefined, action)).toEqual(
				expected
			);
		});
	});
	describe('Delete Courses', () => {
		it('should set isLoading to true', () => {
			const expected = { ...state, isLoading: true };
			const action = CoursesAction.deleteCourse;
			expect(fromMyReducers.coursesReducers(undefined, action)).toEqual(
				expected
			);
		});
		it('Success --> should delete course course', () => {
			const oldState = { ...state, courses: mockCourses };
			const toDeleteCourse = mockCourses[0];
			const newState = {
				...oldState,
				isLoading: false,
				courses: [
					...oldState.courses.filter(
						(course) => course.id !== toDeleteCourse.id
					),
				],
			};
			const action = CoursesAction.deleteCourseSuccess({
				course: toDeleteCourse,
			});
			expect(fromMyReducers.coursesReducers(oldState, action)).toEqual(
				newState
			);
		});
		it('Failure --> should set error to null', () => {
			const expected = { ...state, error: error };
			const action = CoursesAction.deleteCourseFailure;
			expect(fromMyReducers.coursesReducers(undefined, action)).toEqual(
				expected
			);
		});
	});
});
