import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCompositionComponent } from './course-composition.component';

describe('CourseCompositionComponent', () => {
	let component: CourseCompositionComponent;
	let fixture: ComponentFixture<CourseCompositionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CourseCompositionComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(CourseCompositionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
