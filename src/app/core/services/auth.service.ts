import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/utils/global.model';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(private router: Router) {}
	private currentUserSubject = new BehaviorSubject<User>(new User());
	private isAuthenticatedSubject = new BehaviorSubject<boolean>(Boolean(false));
	public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

	login(user: User) {
		this.currentUserSubject.next(user);
		this.isAuthenticatedSubject.next(true);
		console.log(`${user.firstName} ${user.lastName} - You are log in!`);
		this.router.navigate(['courses']);
	}
	logout() {
		console.log(
			`${this.currentUserSubject.value.firstName} ${this.currentUserSubject.value.lastName} - You are log out!`
		);
		this.isAuthenticatedSubject.next(false);
		localStorage.clear();
		this.router.navigate(['login']);
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
