import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { CourseListComponent } from './course-list.component';
import { OrderByPipe } from '../../../shared/pipes/orderBy.pipe';
import { FilterPipe } from '../../../shared/pipes/filter.pipe';

describe('CourseListComponent', () => {
	let component: CourseListComponent;
	let fixture: ComponentFixture<CourseListComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			declarations: [CourseListComponent, OrderByPipe, FilterPipe],
			providers: [FilterPipe, Renderer2],
		});
		fixture = TestBed.createComponent(CourseListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should emit deleteCourse when called onDeleteCourse method', async () => {
		const id = 888;
		spyOn(component.deleteCourse, 'emit');
		component.onDeleteCourse(id);
		expect(component.deleteCourse.emit).toHaveBeenCalledWith(id);
	});
});
