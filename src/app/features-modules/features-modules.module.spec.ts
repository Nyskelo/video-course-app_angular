import { TestBed } from '@angular/core/testing';
import { FeaturesModulesModule } from './features-modules.module';

describe('FeaturesModulesModule', () => {
	let pipe: FeaturesModulesModule;

	beforeEach(() => {
		TestBed.configureTestingModule({ providers: [FeaturesModulesModule] });
		pipe = TestBed.inject(FeaturesModulesModule);
	});

	it('can load instance', () => {
		expect(pipe).toBeTruthy();
	});
});
