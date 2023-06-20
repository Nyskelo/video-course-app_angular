import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { BehaviorSubject, of } from 'rxjs';
class StoreMock {
	select = jasmine
		.createSpy()
		.and.returnValue(
			of({ userNameSelector: 'Peter', isLoggedInSelector: true })
		);
}
const storeSubjectMock = new BehaviorSubject(StoreMock);
const mockedStore = {
	pipe: () => storeSubjectMock.asObservable(),
	dispatch: () => jasmine.createSpy(),
};

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
				{ provide: Store, useValue: mockedStore },
			],
		});
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		spyOn(window, 'alert');
	});

	describe('onSubmit', () => {
		it('should not be called if any field is empty', () => {
			spyOn(component, 'onSubmit').and.callThrough();
			component.email.setValue('');
			component.password.setValue('one');
			component.onSubmit();
			expect(window.alert).toHaveBeenCalled();
		});

		it('should call the service login method if the data is valid', () => {
			spyOn(mockedStore, 'dispatch').and.callThrough();
			component.email.setValue('not empty');
			component.password.setValue('not empty');
			component.onSubmit();
			expect(mockedStore.dispatch).toHaveBeenCalled();
		});
	});
});
