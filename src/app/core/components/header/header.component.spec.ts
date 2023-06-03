import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './header.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/utils/global.model';

let serviceSpy: jasmine.SpyObj<AuthService>;
const user = { firstName: 'Pretty', lastName: 'Funny', id: '999' };

describe('HeaderComponent', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;
	const mockRouter = {
		navigate: jasmine.createSpy('navigate'),
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			declarations: [HeaderComponent],
			providers: [{ provide: Router, useValue: mockRouter }],
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
				JSON.stringify(user.firstName)
			);
			expect(component.userName).toEqual(user.firstName);
			expect(serviceSpy.getUserInfo).toHaveBeenCalled();
		});
	});
});
