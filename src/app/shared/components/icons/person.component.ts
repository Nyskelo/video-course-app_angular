import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-i-person',
	template: `<span class="material-icons"> person </span>`,
	styleUrls: ['./_icons.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonComponent {}
