import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CourseListComponent } from './course-list.component';

describe('CourseListComponent', () => {
	let component: CourseListComponent;
	let fixture: ComponentFixture<CourseListComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			declarations: [CourseListComponent],
		});
		fixture = TestBed.createComponent(CourseListComponent);
		component = fixture.componentInstance;
	});

	it('can load instance', () => {
		expect(component).toBeTruthy();
	});
});