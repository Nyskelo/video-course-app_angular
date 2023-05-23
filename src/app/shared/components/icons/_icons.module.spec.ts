import { TestBed } from '@angular/core/testing';
import { IconsModule } from './_icons.module';

describe('IconsModule', () => {
	let pipe: IconsModule;

	beforeEach(() => {
		TestBed.configureTestingModule({ providers: [IconsModule] });
		pipe = TestBed.inject(IconsModule);
	});

	it('can load instance', () => {
		expect(pipe).toBeTruthy();
	});
});
