import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	login() {
		console.log('You are log in');
	}
	logout() {
		console.log('You are log out');
	}
	getUserInfo() {
		console.log('User info: data');
	}
	isAuthenticated() {
		console.log('User auth true or false');
	}
}
