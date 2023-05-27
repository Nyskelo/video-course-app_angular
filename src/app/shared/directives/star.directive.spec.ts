/* tslint:disable:no-unused-variable */

import { ElementRef, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { StarDirective } from './star.directive';

const mockElementRef: ElementRef = {
	nativeElement: 'h1',
};
let renderer: jasmine.SpyObj<Renderer2>;

describe('Directive: Star', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [Renderer2],
		}).compileComponents();
	});
	it('should create an instance', () => {
		renderer = jasmine.createSpyObj('renderer', [
			'appendChild',
			'createElement',
			'createText',
			'setStyle',
		]);
		const directive = new StarDirective(mockElementRef, renderer);
		directive.appStar = true;
		expect(renderer.appendChild).toHaveBeenCalled();
	});
});
