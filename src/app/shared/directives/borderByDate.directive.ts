import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
	selector: '[appBorderByDate]',
})
export class BorderByDateDirective {
	constructor(private element: ElementRef) {}
	@Input() set appBorderByDate(date: string) {
		const FRESHDAYS = 14;
		const fresh = new Date(
			new Date().getTime() - FRESHDAYS * 24 * 60 * 60 * 1000
		);

		const creationDate = new Date(date);
		const currentDate = new Date();

		const isFreshState = creationDate >= fresh && creationDate < currentDate;
		const isReleasedState = creationDate > currentDate;

		if (isFreshState) {
			this.element.nativeElement.style.border = '2px solid #66a300';
		}
		if (isReleasedState) {
			this.element.nativeElement.style.border = '2px solid #009ecd';
		} else {
			return;
		}
	}
}
