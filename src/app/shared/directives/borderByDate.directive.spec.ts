/* tslint:disable:no-unused-variable */
import { ElementRef, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BorderByDateDirective } from './borderByDate.directive';

let renderer: jasmine.SpyObj<Renderer2>;

describe('BorderByDateDirective shoude set a class name by date creation if freshDate or releasedDate, atherwise do nothing', () => {
	let fixture: BorderByDateDirective;
	const mockElementRef: ElementRef = {
		nativeElement: 'div',
	};
	renderer = jasmine.createSpyObj('renderer', ['setAttribute']);

	beforeEach(function () {
		TestBed.configureTestingModule({
			providers: [Renderer2],
		}).compileComponents();
		fixture = new BorderByDateDirective(mockElementRef, renderer);
		jasmine.clock().install();
		const baseTime = new Date('2023-05-26T02:02:36+00:00');
		jasmine.clock().mockDate(baseTime);
	});

	afterEach(function () {
		jasmine.clock().uninstall();
	});

	describe('if freshDate (creationDate >= currentDate-14days && creationDate < currentDate):', () => {
		it('should set the classname "fresh-state"', () => {
			fixture.appBorderByDate = '2023-05-20T02:02:36+00:00';
			expect(renderer.setAttribute).toHaveBeenCalledWith(
				mockElementRef.nativeElement,
				'class',
				'fresh-state'
			);
		});
	});

	describe('if releasedDate (creationDate > currentDate):', () => {
		it('should set the classname "released-state"', () => {
			fixture.appBorderByDate = '2023-06-20T02:02:36+00:00';
			expect(renderer.setAttribute).toHaveBeenCalledWith(
				mockElementRef.nativeElement,
				'class',
				'released-state'
			);
		});
	});
});
