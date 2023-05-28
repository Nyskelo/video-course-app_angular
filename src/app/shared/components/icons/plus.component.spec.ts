import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PlusComponent } from './plus.component';

describe('PlusComponent', () => {
	let component: PlusComponent;
	let fixture: ComponentFixture<PlusComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			declarations: [PlusComponent],
		});
		fixture = TestBed.createComponent(PlusComponent);
		component = fixture.componentInstance;
	});

	it('can load instance', () => {
		expect(component).toBeTruthy();
	});
});
