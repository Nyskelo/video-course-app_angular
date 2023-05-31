import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/utils/global.model';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private currentUserSubject = new BehaviorSubject<User>(new User());
	private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
	public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

	login(user: User) {
		this.currentUserSubject.next(user);
		this.isAuthenticatedSubject.next(true);
		console.log(`${user.firstName} ${user.lastName} - You are log in!`);
	}
	logout() {
		console.log(
			`${this.currentUserSubject.value.firstName} ${this.currentUserSubject.value.lastName} - You are log out!`
		);
		localStorage.clear();
		this.isAuthenticatedSubject.next(false);
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
