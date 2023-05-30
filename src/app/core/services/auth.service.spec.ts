import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
	let service: AuthService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(AuthService);
		spyOn(console, 'log');
	});
	describe('login', () => {
		it('login', () => {
			service.login();
			expect(console.log).toHaveBeenCalledWith('You are log in');
		});
	});
	describe('logout', () => {
		it('logout', () => {
			service.logout();
			expect(console.log).toHaveBeenCalledWith('You are log out');
		});
	});
	describe('getUserInfo', () => {
		it('getUserInfo', () => {
			service.getUserInfo();
			expect(console.log).toHaveBeenCalledWith('User info: data');
		});
	});
	describe('isAuthenticated', () => {
		it('isAuthenticated', () => {
			service.isAuthenticated();
			expect(console.log).toHaveBeenCalledWith('User auth true or false');
		});
	});
});
