import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EditComponent } from './edit.component';

describe('EditComponent', () => {
	let component: EditComponent;
	let fixture: ComponentFixture<EditComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			schemas: [NO_ERRORS_SCHEMA],
			declarations: [EditComponent],
		});
		fixture = TestBed.createComponent(EditComponent);
		component = fixture.componentInstance;
	});

	it('can load instance', () => {
		expect(component).toBeTruthy();
	});
});
