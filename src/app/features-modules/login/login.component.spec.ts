import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/core/services/auth.service';

let serviceSpy: jasmine.SpyObj<AuthService>;

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			declarations: [LoginComponent],
		});
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		serviceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
		spyOn(window, 'alert');
	});

	describe('onInputEmailValue', () => {
		it('should emit logEmail', () => {
			spyOn(component, 'onInputEmailValue').and.callThrough();
			spyOn(component.logEmail, 'emit');
			const newInputValue = 'new-email';
			component.onInputEmailValue(newInputValue);
			expect(component.logEmail.emit).toHaveBeenCalledWith(newInputValue);
		});
	});

	describe('onInputPasswordValue', () => {
		it('should emit logPassword', () => {
			spyOn(component, 'onInputPasswordValue').and.callThrough();
			spyOn(component.logPassword, 'emit');
			const newInputValue = 'new-password';
			component.onInputPasswordValue(newInputValue);
			expect(component.logPassword.emit).toHaveBeenCalledWith(newInputValue);
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

		it('should clear inputs and call the service login method if the data is valid', () => {
			spyOn(component, 'onSubmit').and.callThrough();
			spyOn(serviceSpy, 'login').and.returnValue();
			spyOn(component.logEmail, 'emit');
			spyOn(component.logPassword, 'emit');

			const newUser = { firstName: 'Pretty', lastName: 'GoodDay', id: '111' };
			component.email = 'not empty';
			component.password = 'not empty';

			component.onSubmit();

			expect(component.logEmail.emit).toHaveBeenCalledWith('');
			expect(component.logPassword.emit).toHaveBeenCalledWith('');
			expect(serviceSpy.login).toHaveBeenCalledWith(newUser);
		});
	});
});
