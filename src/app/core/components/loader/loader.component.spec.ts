/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { initStateCourses } from 'src/app/store/courses/reducers';
import { initStateUser } from 'src/app/store/user/reducers';

import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
	let component: LoaderComponent;
	let fixture: ComponentFixture<LoaderComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [LoaderComponent],
			imports: [StoreModule.forRoot({})],
			providers: [
				provideMockStore({
					initialState: {
						courses: initStateCourses,
						user: initStateUser,
					},
				}),
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(LoaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
