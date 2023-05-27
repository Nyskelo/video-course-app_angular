/* tslint:disable:no-unused-variable */
import { ElementRef } from '@angular/core';
import { BorderByDateDirective } from './borderByDate.directive';

describe(`BorderByDateDirective shoude changed border color by date creation:
- freshDate to green;
- releasedDate to blue;
- else -> nothing shoude changed.
`, () => {
	let fixture: BorderByDateDirective;
	const mockElementRef: ElementRef = {
		nativeElement: {
			style: { border: 'none' },
		},
	};

	beforeEach(function () {
		fixture = new BorderByDateDirective(mockElementRef);
		jasmine.clock().install();
		const baseTime = new Date('2023-05-26T02:02:36+00:00');
		jasmine.clock().mockDate(baseTime);
	});

	afterEach(function () {
		jasmine.clock().uninstall();
	});

	it('shoude changed border color to green', () => {
		const green = '2px solid #66a300';
		fixture.appBorderByDate = '2023-05-20T02:02:36+00:00';
		expect(mockElementRef.nativeElement.style.border).toEqual(green);
	});
	it('shoude changed border color to blue', () => {
		const blue = '2px solid #009ecd';
		fixture.appBorderByDate = '2023-06-20T02:02:36+00:00';
		expect(mockElementRef.nativeElement.style.border).toEqual(blue);
	});
});
