import { TestBed } from '@angular/core/testing';
import { CoursesModule } from './courses.module';

describe('CoursesModule', () => {
	let pipe: CoursesModule;

	beforeEach(() => {
		TestBed.configureTestingModule({ providers: [CoursesModule] });
		pipe = TestBed.inject(CoursesModule);
	});

	it('can load instance', () => {
		expect(pipe).toBeTruthy();
	});
});
