import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-i-calendar',
	template: `<span class="material-icons"> calendar_today </span>`,
	styleUrls: ['./_icons.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {}
