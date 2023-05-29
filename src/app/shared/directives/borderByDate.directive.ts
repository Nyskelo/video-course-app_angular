import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
	selector: '[appBorderByDate]',
})
export class BorderByDateDirective {
	constructor(private element: ElementRef, private renderer: Renderer2) {}
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
			this.renderer.setAttribute(
				this.element.nativeElement,
				'class',
				'fresh-state'
			);
		}
		if (isReleasedState) {
			this.renderer.setAttribute(
				this.element.nativeElement,
				'class',
				'released-state'
			);
		}
	}
}
