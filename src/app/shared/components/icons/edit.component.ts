import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-i-edit',
	template: `<span class="material-icons"> edit </span>`,
	styleUrls: ['./_icons.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent {}
