import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
	@Input() text = 'Button';
	@Input() type = 'button';
	@Input() disabled = false;
}
