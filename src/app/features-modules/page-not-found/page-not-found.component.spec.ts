import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found.component';
import { Router } from '@angular/router';

describe('PageNotFoundComponent', () => {
	let component: PageNotFoundComponent;
	let fixture: ComponentFixture<PageNotFoundComponent>;

	beforeEach(() => {
		const mockRouter = {
			navigate: jasmine.createSpy('navigate'),
		};
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			declarations: [PageNotFoundComponent],
			providers: [[{ provide: Router, useValue: mockRouter }]],
		});
		fixture = TestBed.createComponent(PageNotFoundComponent);
		component = fixture.componentInstance;
	});

	it('onClick', () => {
		spyOn(component, 'onClick').and.callThrough();
		component.onClick();
		expect(component.onClick).toHaveBeenCalled();
	});
});
