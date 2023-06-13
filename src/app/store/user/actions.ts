import { createAction, props } from '@ngrx/store';
import { User, UserAuth } from 'src/app/utils/global.model';

//Login
export const userLogin = createAction(
	'[User] User login',
	props<{ auth: UserAuth }>()
);
export const userLoginSuccess = createAction(
	'[User] User login success',
	props<{ token: string; auth: UserAuth }>()
);
export const userLoginFailure = createAction(
	'[User] User login failure',
	props<{ error: string }>()
);

//Logout
export const userLogout = createAction('[User] User logout');
export const userLogoutSuccess = createAction(
	'[User] User logout success',
	props<{ user: User }>()
);
export const userLogoutFailure = createAction(
	'[User] User logout failure',
	props<{ error: string }>()
);

//Auth
export const userAuth = createAction(
	'[User] User authorization',
	props<{ token: string }>()
);
export const userAuthSuccess = createAction(
	'[User] User authorization success',
	props<{ user: User }>()
);
export const userAuthFailure = createAction(
	'[User] User authorization failure',
	props<{ error: string }>()
);
