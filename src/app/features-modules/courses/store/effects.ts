import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CoursesService } from '../services/courses.service';
import * as CoursesActions from './actions';

@Injectable()
export class CoursesEffects {
	getCourses$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CoursesActions.getCourses),
			mergeMap((payload) => {
				return this.coursesService
					.getCourses(payload.start, payload.count)
					.pipe(
						map((courses) => {
							return CoursesActions.getCoursesSuccess({
								courses: courses,
								start: payload.start || 0,
							});
						}),
						catchError((error) =>
							of(CoursesActions.getCoursesFailure({ error: error.message }))
						)
					);
			})
		)
	);

	deleteCourse$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CoursesActions.deleteCourse),
			mergeMap((payload) => {
				return this.coursesService.deleteCourse(payload.course).pipe(
					map(() => {
						return CoursesActions.deleteCourseSuccess({
							course: payload.course,
						});
					}),
					catchError((error) =>
						of(CoursesActions.getCoursesFailure({ error: error.message }))
					)
				);
			})
		)
	);
	updateCourse$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CoursesActions.updateCourse),
			mergeMap((payload) => {
				return this.coursesService.updateCourse(payload.course).pipe(
					map(() => {
						return CoursesActions.updateCourseSuccess({
							course: payload.course,
						});
					}),
					catchError((error) =>
						of(CoursesActions.getCoursesFailure({ error: error.message }))
					)
				);
			})
		)
	);
	addCourse$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CoursesActions.addCourse),
			mergeMap((payload) => {
				return this.coursesService.addCourse(payload.course).pipe(
					map(() => {
						return CoursesActions.addCourseSuccess({
							course: payload.course,
						});
					}),
					catchError((error) =>
						of(CoursesActions.getCoursesFailure({ error: error.message }))
					)
				);
			})
		)
	);
	searchCourses$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CoursesActions.searchCourses),
			mergeMap((payload) => {
				return this.coursesService.searchCourses(payload.term).pipe(
					map((courses) => {
						return CoursesActions.searchCoursesSuccess({
							courses,
						});
					}),
					catchError((error) =>
						of(CoursesActions.getCoursesFailure({ error: error.message }))
					)
				);
			})
		)
	);

	constructor(
		private actions$: Actions,
		private coursesService: CoursesService
	) {}
}
