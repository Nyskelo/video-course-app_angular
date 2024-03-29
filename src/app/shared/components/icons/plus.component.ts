import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-i-plus',
	template: ` <span class="material-icons"> add_circle </span> `,
	styleUrls: ['./_icons.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlusComponent {}
