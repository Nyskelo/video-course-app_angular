import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { Course } from './utils/global.model';
import { AuthService } from './core/services/auth.service';

const course = {
	id: 8693,
	name: 'JavaScript',
	description:
		'Est minim ea aute sunt laborum minim eu excepteur. Culpa sint exercitation mollit enim ad culpa aliquip laborum cillum. Dolor officia culpa labore ex eiusmod ut est ea voluptate ea nostrud.',
	isTopRated: true,
	date: '2023-09-28T04:39:24+00:00',
	authors: [
		{
			id: 1370,
			name: 'Polly',
			lastName: 'Sosa',
		},
	],
	length: 15,
};

describe('AppComponent', () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;
	let activeRouter: ActivatedRoute;
	let titleService: Title;
	let service: AuthService;

	const routerevent = {
		events: of(
			new NavigationEnd(
				0,
				'http://localhost:4200/courses',
				'http://localhost:4200/courses'
			)
		),
	};

	const activatedRouteMock: {
		firstChild: boolean;
		data: Observable<{ title: string; course: Course | string }>;
	} = {
		firstChild: false,
		data: of({ title: 'Title', course: course }),
	};

	const http = {
		post: () => ({ subscribe: () => {} }),
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			imports: [RouterTestingModule],
			declarations: [AppComponent],
			providers: [
				Title,
				AuthService,
				{ provide: Router, useValue: routerevent },
				{ provide: ActivatedRoute, useValue: activatedRouteMock },
				{ provide: HttpClient, useValue: http },
			],
		});
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		activeRouter = TestBed.inject(ActivatedRoute);
		titleService = TestBed.inject(Title);
		service = TestBed.inject(AuthService);
	});

	afterEach(() => {
		activatedRouteMock.firstChild = false;
	});

	it(`title has default value`, () => {
		expect(component.title).toEqual(`Video course`);
	});

	describe('ngOnInit', () => {
		it(`should call service.authorization if token is true`, () => {
			spyOn(service, 'authorization').and.callThrough();
			component.token = 'token';
			component.ngOnInit();
			expect(service.authorization).toHaveBeenCalled();
		});
		it(`should call settTitle function`, () => {
			spyOn(component, 'setTitle').and.callThrough();
			component.ngOnInit();
			expect(component.setTitle).toHaveBeenCalled();
		});
	});

	describe('getChild', () => {
		it(`should be called once if firstChild is falsy`, () => {
			spyOn(component, 'getChild').and.callThrough();
			activatedRouteMock.firstChild = false;
			component.getChild(activeRouter);
			expect(component.getChild).toHaveBeenCalledTimes(1);
		});
		it(`should be called once if firstChild is true`, () => {
			spyOn(component, 'getChild').and.callThrough();
			activatedRouteMock.firstChild = true;
			component.getChild(activeRouter);
			expect(component.getChild).toHaveBeenCalledTimes(2);
		});
	});

	describe('setTitle', () => {
		it(`The titleServiceName should equal the courseName if course.name is true`, () => {
			spyOn(component, 'setTitle').and.callThrough();
			activatedRouteMock.data = of({ title: 'Title', course: course });
			component.setTitle();
			expect(titleService.getTitle()).toEqual(course.name);
		});
		it(`The titleServiceName should equal the routeTitle if course.name is false`, () => {
			spyOn(component, 'setTitle').and.callThrough();
			activatedRouteMock.data = of({ title: 'Title', course: '' });
			component.setTitle();
			expect(titleService.getTitle()).toEqual('Title');
		});
	});
});
