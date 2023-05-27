import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-i-star',
	template: `<span class="material-icons star"> star_rate </span>`,
	styleUrls: ['./_icons.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
