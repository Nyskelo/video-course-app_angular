import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { customPath, User, UserAuth } from 'src/app/utils/global.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private router: Router, private http: HttpClient) {}
	private currentUserSubject = new BehaviorSubject<User>(new User());
	private isAuthenticatedSubject = new BehaviorSubject<boolean>(Boolean(false));

	public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
	public currentUser$ = this.currentUserSubject.asObservable();

	userInfoApi = 'http://localhost:3004/auth/userinfo';
	loginApi = 'http://localhost:3004/auth/login';

	login(userAuth: UserAuth) {
		this.http.post<{ token: string }>(this.loginApi, userAuth).subscribe({
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

	logout() {
		this.isAuthenticatedSubject.next(false);
		localStorage.clear();
		this.router.navigate([customPath.login]);
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
