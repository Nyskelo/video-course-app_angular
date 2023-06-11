/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('Service: Loader', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [LoaderService],
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
