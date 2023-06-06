import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

describe('AppComponent', () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;
	let activeRouter: ActivatedRoute;
	let router: Router;
	const activatedRouteMock = { firstChild: false };

	beforeEach(() => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			declarations: [AppComponent],
			providers: [
				Router,
				Title,
				{ provide: ActivatedRoute, useValue: activatedRouteMock },
			],
		});
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		router = TestBed.inject(Router);
		activeRouter = TestBed.inject(ActivatedRoute);
		// eslint-disable-next-line @typescript-eslint/ban-types
	});

	it(`title has default value`, () => {
		expect(component.title).toEqual(`Video course`);
	});
	it(`getChild`, () => {
		spyOn(component, 'getChild').and.callThrough();
		activatedRouteMock.firstChild = true;
		component.getChild(activeRouter);
		expect(component.getChild).toHaveBeenCalledWith(activeRouter);
		expect(activatedRouteMock.firstChild).toBeTruthy();
	});
	it(`ngOnInit`, () => {
		spyOn(component, 'ngOnInit').and.callThrough();
		spyOn(router.events, 'pipe').and.callThrough();
		component.ngOnInit();
		expect(router.events.pipe).toHaveBeenCalled();
	});
});
