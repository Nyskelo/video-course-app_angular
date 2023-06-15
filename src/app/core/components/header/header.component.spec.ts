import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './header.component';
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
				{ provide: Store, useValue: mockedStore },
			],
		});
		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
	});
	describe('onLogout', () => {
		it('should call service method "logout"', () => {
			spyOn(mockedStore, 'dispatch').and.callThrough();
			component.onLogout();
			expect(mockedStore.dispatch).toHaveBeenCalled();
		});
	});
});
