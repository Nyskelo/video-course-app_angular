import { TestBed } from '@angular/core/testing';
import { ModulesRoutingModule } from './features-modules-routing.module';

describe('ModulesRoutingModule', () => {
	let pipe: ModulesRoutingModule;

	beforeEach(() => {
		TestBed.configureTestingModule({ providers: [ModulesRoutingModule] });
		pipe = TestBed.inject(ModulesRoutingModule);
	});

	it('can load instance', () => {
		expect(pipe).toBeTruthy();
	});
});
