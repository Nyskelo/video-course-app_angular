import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

const user = { firstName: 'Pretty', lastName: 'GoodDay', id: '222' };

describe('AuthService', () => {
	let service: AuthService;
	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(AuthService);
		spyOn(console, 'log');
	});
	describe('login', () => {
		it('should set isAuth to true', () => {
			service.authenticat = false;
			service.login(user);
			expect(service.isAuthenticated()).toBeTruthy();
		});
	});
	describe('logout', () => {
		it('should set isAuth to false', () => {
			service.authenticat = true;
			service.logout();
			expect(service.isAuthenticated()).toBeFalsy();
		});
	});
	describe('getUserInfo', () => {
		it('should return User value', () => {
			service.currentUser = user;
			expect(service.getUserInfo()).toEqual(user);
		});
	});

	describe('isAuthenticated', () => {
		it('should set isAuthenticated value to true', () => {
			spyOn(service, 'isAuthenticated').and.callThrough();
			service.authenticat = true;
			expect(service.isAuthenticated()).toEqual(true);
		});
	});
});
