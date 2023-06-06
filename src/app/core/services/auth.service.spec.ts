import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from './auth.service';

const user = {
	id: 2,
	fakeToken: '58ebfdf7ec92657b493b24da',
	name: {
		first: 'Brock',
		last: 'Beasley',
	},
	login: 'Morales',
	password: 'id',
};

describe('AuthService', () => {
	let service: AuthService;
	let httpClientSpy: jasmine.SpyObj<HttpClient>;
	let mockRouter: jasmine.SpyObj<Router>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [{ provide: Router, useValue: mockRouter }],
		});
		httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
		mockRouter = jasmine.createSpyObj('Router', ['navigate']);
		service = new AuthService(mockRouter, httpClientSpy);
		spyOn(console, 'log');
	});

	describe('login', () => {
		it('should set isAuth to true if user auth', () => {
			httpClientSpy.post.and.returnValue(of({ token: user.fakeToken }));
			spyOn(service, 'login').and.callThrough();
			service.login({ login: user.login, password: user.password });
			service.authorization(user.fakeToken);
			expect(service.isAuthenticated()).toBeTruthy();
		});
		it('should set isAuth to false if user not auth', () => {
			httpClientSpy.post.and.returnValue(throwError(() => new Error()));
			spyOn(service, 'login').and.callThrough();
			service.login({ login: user.login, password: user.password });
			expect(service.isAuthenticated()).toBeFalsy();
		});
	});

	describe('authorization', () => {
		it('should set isAuth to false if user not auth', () => {
			httpClientSpy.post.and.returnValue(throwError(() => new Error()));
			spyOn(service, 'authorization').and.callThrough();
			service.authorization(user.fakeToken);
			expect(service.isAuthenticated()).toBeFalsy();
		});
	});

	describe('logout', () => {
		it('should set isAuth to false', () => {
			service.authenticat = true;
			service.logout();
			expect(mockRouter.navigate).toHaveBeenCalled();
			expect(service.isAuthenticated()).toBeFalsy();
		});
	});
	describe('getUserInfo', () => {
		it('should return User value', () => {
			spyOn(service, 'getUserInfo').and.callThrough();
			service.currentUser = user;

			expect(service.getUserInfo()).toEqual(user);
		});
	});

	describe('isAuthenticated', () => {
		it('should set isAuthenticated value to true', () => {
			spyOn(service, 'isAuthenticated').and.callThrough();
			service.authenticat = true;
			console.log(service.isAuthenticated());
			expect(service.isAuthenticated()).toEqual(true);
		});
	});
});
