import { TestBed } from '@angular/core/testing';
import { CoursesRoutingModule } from './courses-routing.module';

describe('CoursesRoutingModule', () => {
	let pipe: CoursesRoutingModule;

	beforeEach(() => {
		TestBed.configureTestingModule({ providers: [CoursesRoutingModule] });
		pipe = TestBed.inject(CoursesRoutingModule);
	});

	it('can load instance', () => {
		expect(pipe).toBeTruthy();
	});
});
