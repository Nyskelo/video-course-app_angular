import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { CoursesComponent } from './courses.component';
import { SearchbarComponent } from 'src/app/shared/components/searchbar/searchbar.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CourseListComponent } from './course-list/course-list.component';

describe('CoursesComponent', () => {
	let component: CoursesComponent;
	let fixture: ComponentFixture<CoursesComponent>;
	let el: DebugElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			declarations: [
				CoursesComponent,
				SearchbarComponent,
				ButtonComponent,
				CourseListComponent,
			],
		});
		fixture = TestBed.createComponent(CoursesComponent);
		component = fixture.componentInstance;
		el = fixture.debugElement;
	});

	it('can load instance', () => {
		expect(component).toBeTruthy();
	});

	it(`courses has default value`, () => {
		expect(component.courses).toEqual([]);
	});

	it(`should assign courses when component initilazed`, () => {
		fixture.detectChanges();
		expect(component.courses.length).toBeGreaterThan(0);
	});

	it('should be called onSearchClick when the Search button is clicked', () => {
		fixture.detectChanges();

		spyOn(component, 'onSearchClick').and.callThrough();

		const button = el.nativeElement.querySelector(
			'app-button[ng-reflect-text=Search]'
		);

		button.click();

		expect(component.onSearchClick).toHaveBeenCalled();
	});

	it('should be called onLoadMore when the "Load more" button is clicked', () => {
		fixture.detectChanges();

		spyOn(component, 'onLoadMore').and.callThrough();

		const button = el.nativeElement.querySelector(
			'app-button[ng-reflect-text="Load more"]'
		);

		button.click();

		expect(component.onLoadMore).toHaveBeenCalled();
	});

	it('should be called onDeleteCourseID when the "Delete" button is clicked', () => {
		fixture.detectChanges();

		spyOn(component, 'onDeleteCourseID').and.callThrough();

		const button = el.nativeElement.querySelector(
			'app-button[ng-reflect-text="Delete"]'
		);

		button.click();

		expect(component.onDeleteCourseID).toHaveBeenCalled();
	});
});
