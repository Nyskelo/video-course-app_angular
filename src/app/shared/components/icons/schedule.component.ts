import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-i-schedule',
	template: ` <span class="material-icons"> schedule </span> `,
	styleUrls: ['./_icons.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleComponent {}
