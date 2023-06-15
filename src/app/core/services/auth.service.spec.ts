import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
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

const testStore = jasmine.createSpyObj('Store', ['dispatch']);

describe('AuthService', () => {
	let service: AuthService;
	let httpClientSpy: jasmine.SpyObj<HttpClient>;
	let mockRouter: jasmine.SpyObj<Router>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{ provide: Router, useValue: mockRouter },
				{ provide: Store, useValue: testStore },
			],
		});
		httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
		mockRouter = jasmine.createSpyObj('Router', ['navigate']);
		service = new AuthService(mockRouter, httpClientSpy, testStore);
	});

	describe('userLogin', () => {
		it('should return token', () => {
			httpClientSpy.post.and.returnValue(of({ token: user.fakeToken }));
			service
				.userLogin({ login: user.login, password: user.password })
				.subscribe((token) => {
					expect(token).toEqual(user.fakeToken);
				});
			expect(httpClientSpy.post).toHaveBeenCalled();
			expect(testStore.dispatch).toHaveBeenCalled();
		});
	});

	describe('userAuth', () => {
		it('should set isAuth to false if user not auth', () => {
			httpClientSpy.post.and.returnValue(of({ user: user }));
			service.userAuth(user.fakeToken).subscribe((user) => {
				expect(user).toEqual(user);
			});
			expect(httpClientSpy.post).toHaveBeenCalled();
		});
	});

	describe('userLogout', () => {
		it('should set isAuth to false', () => {
			service.userLogout();
			expect(mockRouter.navigate).toHaveBeenCalled();
		});
	});
});
