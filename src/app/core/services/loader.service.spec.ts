/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { LoaderService } from './loader.service';
import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { initStateCourses } from 'src/app/store/courses/reducers';
import { initStateUser } from 'src/app/store/user/reducers';

describe('Service: Loader', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [StoreModule.forRoot({})],
			providers: [
				provideMockStore({
					initialState: {
						courses: initStateCourses,
						user: initStateUser,
					},
				}),
			],
		});
	});

	it('hide', inject([LoaderService], (service: LoaderService) => {
		spyOn(service.isLoading, 'next').and.callThrough();
		service.hide();
		expect(service.isLoading.next).toHaveBeenCalledWith(false);
	}));
	it('show', inject([LoaderService], (service: LoaderService) => {
		spyOn(service.isLoading, 'next').and.callThrough();
		service.show();
		expect(service.isLoading.next).toHaveBeenCalledWith(true);
	}));
});
