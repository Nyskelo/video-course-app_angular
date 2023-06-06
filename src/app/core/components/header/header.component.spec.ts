import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './header.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

let serviceSpy: jasmine.SpyObj<AuthService>;
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

describe('HeaderComponent', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;
	const mockRouter = {
		navigate: jasmine.createSpy('navigate'),
	};
	const http = {
		post: () => [],
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			declarations: [HeaderComponent],
			providers: [
				{ provide: Router, useValue: mockRouter },
				{ provide: HttpClient, useValue: http },
			],
		});
		serviceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
	});
	describe('onLogout', () => {
		it('should call service method "logout"', () => {
			spyOn(serviceSpy, 'logout').and.callThrough();
			component.onLogout();
			expect(serviceSpy.logout).toHaveBeenCalled();
		});
	});

	describe('userName', () => {
		it(`should call service method "getUserInfo" and return ${user}`, () => {
			spyOnProperty(component, 'userName', 'get').and.callThrough();
			spyOn(serviceSpy, 'getUserInfo').and.returnValue(user);
			spyOn(Storage.prototype, 'getItem').and.returnValue(
				JSON.stringify(user.login)
			);
			expect(component.userName).toEqual(user.login);
			expect(serviceSpy.getUserInfo).toHaveBeenCalled();
		});
	});
});
