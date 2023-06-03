import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

let serviceSpy: jasmine.SpyObj<AuthService>;

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	const mockRouter = {
		navigate: jasmine.createSpy('navigate'),
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			declarations: [LoginComponent],
			providers: [{ provide: Router, useValue: mockRouter }],
		});
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		serviceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
		spyOn(window, 'alert');
	});

	describe('onInputEmailValue', () => {
		it('should set email value', () => {
			spyOn(component, 'onInputEmailValue').and.callThrough();
			const newInputValue = 'new-email';
			component.onInputEmailValue(newInputValue);
			expect(component.email).toEqual(newInputValue);
		});
	});

	describe('onInputPasswordValue', () => {
		it('should set password value', () => {
			spyOn(component, 'onInputPasswordValue').and.callThrough();
			const newInputValue = 'new-password';
			component.onInputPasswordValue(newInputValue);
			expect(component.password).toEqual(newInputValue);
		});
	});

	describe('onSubmit', () => {
		it('should not be called if any field is empty', () => {
			spyOn(component, 'onSubmit').and.callThrough();
			component.email = '';
			component.password = '';
			component.onSubmit();
			expect(window.alert).toHaveBeenCalled();
		});

		it('should call the service login method if the data is valid', () => {
			spyOn(component, 'onSubmit').and.callThrough();
			spyOn(serviceSpy, 'login').and.returnValue();

			const newUser = { firstName: 'Pretty', lastName: 'GoodDay', id: '111' };
			component.email = 'not empty';
			component.password = 'not empty';
			component.onSubmit();

			expect(serviceSpy.login).toHaveBeenCalledWith(newUser);
		});
	});
});
