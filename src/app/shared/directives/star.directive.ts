import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
	selector: '[appStar]',
})
export class StarDirective {
	constructor(private element: ElementRef, private renderer: Renderer2) {}
	@Input() set appStar(topRaiting: boolean) {
		if (topRaiting) {
			const span = this.renderer.createElement('span');
			const text = this.renderer.createText('★');
			this.renderer.setStyle(span, 'color', '#facd00');
			this.renderer.appendChild(span, text);
			this.renderer.appendChild(this.element.nativeElement, span);
		}
	}
}
