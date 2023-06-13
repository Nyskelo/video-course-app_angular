import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import * as UserActions from './actions';

@Injectable()
export class UserEffects {
	userLogin$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.userLogin),
			mergeMap((payload) => {
				return this.authService.userLogin(payload.auth).pipe(
					map((token) => {
						return UserActions.userLoginSuccess({
							token: token,
							auth: payload.auth,
						});
					}),
					catchError((error) =>
						of(UserActions.userLoginFailure({ error: error.message }))
					)
				);
			})
		)
	);
	userAuth$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.userAuth),
			mergeMap((payload) => {
				return this.authService.userAuth(payload.token).pipe(
					map((user) => {
						return UserActions.userAuthSuccess({
							user,
						});
					}),
					catchError((error) =>
						of(UserActions.userAuthFailure({ error: error.message }))
					)
				);
			})
		)
	);
	userLogout$ = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActions.userLogout),
			mergeMap(() => {
				return this.authService.userLogout().pipe(
					map((user) => {
						return UserActions.userLogoutSuccess({
							user,
						});
					}),
					catchError((error) =>
						of(UserActions.userLogoutFailure({ error: error.message }))
					)
				);
			})
		)
	);

	constructor(private actions$: Actions, private authService: AuthService) {}
}
