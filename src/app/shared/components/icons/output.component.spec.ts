import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OutputComponent } from './output.component';

describe('OutputComponent', () => {
	let component: OutputComponent;
	let fixture: ComponentFixture<OutputComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			declarations: [OutputComponent],
		});
		fixture = TestBed.createComponent(OutputComponent);
		component = fixture.componentInstance;
	});

	it('can load instance', () => {
		expect(component).toBeTruthy();
	});
});
