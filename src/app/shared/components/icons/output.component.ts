import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-i-output',
	template: `<span class="material-icons"> output </span>`,
	styleUrls: ['./_icons.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OutputComponent {}
