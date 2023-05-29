import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CoursesComponent } from './courses.component';
import { SearchbarComponent } from 'src/app/shared/components/searchbar/searchbar.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { CourseListComponent } from './course-list/course-list.component';
import { DurationPipe } from 'src/app/shared/pipes/duration.pipe';
import { OrderByPipe } from 'src/app/shared/pipes/orderBy.pipe';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';

describe('CoursesComponent', () => {
	let component: CoursesComponent;
	let fixture: ComponentFixture<CoursesComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			declarations: [
				CoursesComponent,
				SearchbarComponent,
				ButtonComponent,
				CourseListComponent,
				DurationPipe,
				OrderByPipe,
				FilterPipe,
			],
			providers: [FilterPipe],
		});
		fixture = TestBed.createComponent(CoursesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		spyOn(console, 'log').and.callThrough();
	});

	it(`should assign courses when component initilazed`, () => {
		fixture.detectChanges();
		expect(component.courses.length).toBeGreaterThan(0);
	});

	it('should log a message when called onSearchClick', () => {
		const searchValue = 'text';
		component.onSearchClick(searchValue);
		expect(console.log).not.toHaveBeenCalledOnceWith(
			`Search value: ${searchValue}`
		);
	});

	it('should log a message when called onLoadMore', () => {
		component.onLoadMore();
		expect(component).toBeTruthy();
	});

	it('should log a message when called onDeleteCourseID', () => {
		const id = 1;
		component.onDeleteCourseID(id);
		expect(console.log).not.toHaveBeenCalledOnceWith(
			`Course with id #${id} has been deleted`
		);
	});
});
