import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, of } from 'rxjs';
import { CoursesService } from 'src/app/features-modules/courses/services/courses.service';
import * as AuthorsActions from './actions';

@Injectable()
export class AuthorsEffects {
	getAuthors$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthorsActions.getAuthors),
			switchMap(() => {
				return this.coursesService.getAuthors().pipe(
					map((authors) => {
						return AuthorsActions.getAuthorsSuccess({
							authors,
						});
					}),
					catchError((error) =>
						of(AuthorsActions.getAuthorsFailure({ error: error.message }))
					)
				);
			})
		)
	);

	deleteAuthor$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthorsActions.deleteAuthor),
			switchMap((payload) => {
				return this.coursesService.deleteAuthor(payload.author).pipe(
					map(() => {
						return AuthorsActions.deleteAuthorSuccess({
							author: payload.author,
						});
					}),
					catchError((error) =>
						of(AuthorsActions.deleteAuthorFailure({ error: error.message }))
					)
				);
			})
		)
	);
	addAuthor$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthorsActions.addAuthor),
			switchMap((payload) => {
				return this.coursesService.addAuthor(payload.author).pipe(
					map(() => {
						return AuthorsActions.addAuthorSuccess({
							author: payload.author,
						});
					}),
					catchError((error) =>
						of(AuthorsActions.addAuthorFailure({ error: error.message }))
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
