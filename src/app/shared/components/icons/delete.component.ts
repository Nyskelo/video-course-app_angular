import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-i-delete',
	template: ` <span class="material-icons"> delete </span>`,
	styleUrls: ['./_icons.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteComponent {}
