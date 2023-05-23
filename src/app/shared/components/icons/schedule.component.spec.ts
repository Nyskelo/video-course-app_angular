import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ScheduleComponent } from './schedule.component';

describe('ScheduleComponent', () => {
	let component: ScheduleComponent;
	let fixture: ComponentFixture<ScheduleComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			declarations: [ScheduleComponent],
		});
		fixture = TestBed.createComponent(ScheduleComponent);
		component = fixture.componentInstance;
	});

	it('can load instance', () => {
		expect(component).toBeTruthy();
	});
});
