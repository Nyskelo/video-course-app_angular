/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from 'src/app/utils/global.model';
import { createReducer, on } from '@ngrx/store';
import * as UserAction from './actions';

export interface UserStateInterface {
	isLoading: boolean;
	user: User;
	isLoggedIn: boolean;
	error: string | null;
}
export const initStateCourses: UserStateInterface = {
	isLoading: false,
	user: new User(),
	isLoggedIn: false,
	error: null,
};

export const userReducers = createReducer(
	initStateCourses,
	//Login
	on(UserAction.userLogin, (state) => ({
		...state,
		isLoading: true,
	})),
	on(UserAction.userLoginSuccess, (state, action) => ({
		...state,
		isLoading: false,
		user: {
			...state.user,
			fakeToken: action.token,
			login: action.auth.login,
			password: action.auth.password,
		},
	})),
	on(UserAction.userLoginFailure, (state, action) => ({
		...state,
		isLoading: false,
		error: action.error,
	})),

	//Auth
	on(UserAction.userAuth, (state) => ({
		...state,
		isLoading: true,
	})),
	on(UserAction.userAuthSuccess, (state, action) => ({
		...state,
		isLoading: false,
		isLoggedIn: true,
		user: {
			...state.user,
			...action.user,
		},
	})),
	on(UserAction.userAuthFailure, (state, action) => ({
		...state,
		isLoading: false,
		error: action.error,
	})),

	//Logout
	on(UserAction.userLogout, (state) => ({
		...state,
		isLoading: true,
	})),
	on(UserAction.userLogoutSuccess, (state, action) => ({
		...state,
		isLoading: false,
		isLoggedIn: false,
		user: action.user,
	})),
	on(UserAction.userLogoutFailure, (state, action) => ({
		...state,
		isLoading: false,
		error: action.error,
	}))
);
