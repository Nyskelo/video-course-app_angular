import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of } from 'rxjs';
import { customPath, User, UserAuth } from 'src/app/utils/global.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/store';
import * as UserActions from 'src/app/store/user/actions';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(
		private router: Router,
		private http: HttpClient,
		private store: Store<AppStateInterface>
	) {}
	private currentUserSubject = new BehaviorSubject<User>(new User());
	private isAuthenticatedSubject = new BehaviorSubject<boolean>(Boolean(false));

	public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
	public currentUser$ = this.currentUserSubject.asObservable();

	userInfoApi = 'http://localhost:3004/auth/userinfo';
	loginApi = 'http://localhost:3004/auth/login';

	userLogin(userAuth: UserAuth) {
		return this.http.post<{ token: string }>(this.loginApi, userAuth).pipe(
			map((data) => {
				localStorage.setItem('token', JSON.stringify(data.token));
				this.store.dispatch(
					UserActions.userAuth({
						token: data.token,
					})
				);
				return data.token;
			})
		);
	}
	login(userAuth: UserAuth) {
		return this.http
			.post<{ token: string }>(this.loginApi, userAuth)
			.subscribe({
				next: ({ token }) => {
					localStorage.setItem('token', JSON.stringify(token));
					this.authorization(token);
				},
				error: (err) => alert(`Error: ${err.status} - ${err.statusText}!`),
				complete: () => console.info('Login request has been completed!'),
			});
	}

	authorization(token: string) {
		this.http.post<User>(this.userInfoApi, { token }).subscribe({
			next: (userInfo) => {
				this.currentUserSubject.next(userInfo);
				this.isAuthenticatedSubject.next(true);
				this.router.navigate([customPath.coursesList]);
			},
			error: (err) => alert(`Error: ${err.status} - ${err.statusText}!`),
			complete: () => console.info('You are login!'),
		});
	}
	userAuth(token: string) {
		return this.http.post<User>(this.userInfoApi, { token }).pipe(
			map((user) => {
				this.router.navigate([customPath.coursesList]);
				return user;
			})
		);
	}

	logout() {
		this.isAuthenticatedSubject.next(false);
		localStorage.clear();
		this.router.navigate([customPath.login]);
	}
	userLogout() {
		localStorage.clear();
		this.router.navigate([customPath.login]);
		return of(new User());
	}

	getUserInfo() {
		return this.currentUserSubject.value;
	}
	isAuthenticated() {
		return this.isAuthenticatedSubject.value;
	}
	set authenticat(value: boolean) {
		this.isAuthenticatedSubject.next(value);
	}
	set currentUser(user: User) {
		this.currentUserSubject.next(user);
	}
}
