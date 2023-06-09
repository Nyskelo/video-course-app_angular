import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

let serviceSpy: jasmine.SpyObj<AuthService>;

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	const mockRouter = {
		navigate: jasmine.createSpy('navigate'),
	};
	const http = {
		post: () => ({ subscribe: () => {} }),
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			providers: [
				{ provide: Router, useValue: mockRouter },
				{ provide: HttpClient, useValue: http },
			],
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
			expect(component.email()).toEqual(newInputValue);
		});
	});

	describe('onInputPasswordValue', () => {
		it('should set password value', () => {
			spyOn(component, 'onInputPasswordValue').and.callThrough();
			const newInputValue = 'new-password';
			component.onInputPasswordValue(newInputValue);
			expect(component.password()).toEqual(newInputValue);
		});
	});

	describe('onSubmit', () => {
		it('should not be called if any field is empty', () => {
			spyOn(component, 'onSubmit').and.callThrough();
			component.email.set('');
			component.password.set('one');
			component.onSubmit();
			expect(window.alert).toHaveBeenCalled();
		});

		it('should call the service login method if the data is valid', () => {
			spyOn(component, 'onSubmit').and.callThrough();
			spyOn(serviceSpy, 'login').and.callThrough();
			component.email.set('not empty');
			component.password.set('not empty');
			component.onSubmit();

			expect(serviceSpy.login).toHaveBeenCalledWith(component.authData());
		});
	});
});
