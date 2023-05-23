import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PersonComponent } from './person.component';

describe('PersonComponent', () => {
	let component: PersonComponent;
	let fixture: ComponentFixture<PersonComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			declarations: [PersonComponent],
		});
		fixture = TestBed.createComponent(PersonComponent);
		component = fixture.componentInstance;
	});

	it('can load instance', () => {
		expect(component).toBeTruthy();
	});
});
