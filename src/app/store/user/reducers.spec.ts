import * as fromMyReducers from './reducers';
import * as UserAction from './actions';
import { User } from 'src/app/utils/global.model';

describe('Reducer: User', () => {
	const token = 'aaaaa';
	const userAuth = { login: 'Alla', password: '11111' };
	let error!: null;

	describe('User Logout', () => {
		it('User Logout --> should set isLoading to true', () => {
			const expected = { ...fromMyReducers.initStateUser, isLoading: true };
			const action = UserAction.userLogout;
			expect(fromMyReducers.userReducers(undefined, action)).toEqual(expected);
		});
		it('User Logout Success --> should set user to init new User()', () => {
			let user!: User;
			const expected = {
				...fromMyReducers.initStateUser,
				user: user,
			};
			const action = UserAction.userLogoutSuccess;
			expect(fromMyReducers.userReducers(undefined, action)).toEqual(expected);
		});
		it('User Logout Failure --> should set error to null', () => {
			const expected = {
				...fromMyReducers.initStateUser,
				error: error,
			};
			const action = UserAction.userLogoutFailure;
			expect(fromMyReducers.userReducers(undefined, action)).toEqual(expected);
		});
	});
	describe('User Login', () => {
		it('should set isLoading to true', () => {
			const expected = { ...fromMyReducers.initStateUser, isLoading: true };
			const action = UserAction.userLogin({
				auth: userAuth,
			});
			expect(fromMyReducers.userReducers(undefined, action)).toEqual(expected);
		});
		it('Success --> should set user to init new User()', () => {
			const expected = {
				...fromMyReducers.initStateUser,
				user: {
					...fromMyReducers.initStateUser.user,
					fakeToken: token,
					...userAuth,
				},
				isLoggedIn: true,
			};
			const action = UserAction.userLoginSuccess({
				token,
				auth: userAuth,
			});
			expect(fromMyReducers.userReducers(undefined, action)).toEqual(expected);
		});
		it('Failure --> should set error to null', () => {
			const expected = {
				...fromMyReducers.initStateUser,
				error: error,
			};
			const action = UserAction.userLoginFailure;
			expect(fromMyReducers.userReducers(undefined, action)).toEqual(expected);
		});
	});
	describe('User Auth', () => {
		it('should set isLoading to true', () => {
			const expected = { ...fromMyReducers.initStateUser, isLoading: true };
			const action = UserAction.userAuth({
				token,
			});
			expect(fromMyReducers.userReducers(undefined, action)).toEqual(expected);
		});
		it('Success --> should set user to init new User()', () => {
			const user = {
				id: 111,
				fakeToken: token,
				name: userAuth,
				login: userAuth.login,
				password: userAuth.password,
			};
			const expected = {
				...fromMyReducers.initStateUser,
				user: {
					...fromMyReducers.initStateUser.user,
					...user,
				},
				isLoggedIn: true,
			};
			const action = UserAction.userAuthSuccess({
				user: user,
			});
			expect(fromMyReducers.userReducers(undefined, action)).toEqual(expected);
		});
		it('Failure --> should set error to null', () => {
			const expected = {
				...fromMyReducers.initStateUser,
				error: error,
			};
			const action = UserAction.userAuthFailure;
			expect(fromMyReducers.userReducers(undefined, action)).toEqual(expected);
		});
	});
});
