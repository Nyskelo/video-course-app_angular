import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
	@Input() name = '';
	@Input() id = '';
	@Input() type = 'text';
	@Input() title = 'text';
	@Input() placeholder = 'Type here...';
	@Input() heigth = '30';
	@Input() width = '200';

	value = '';
	@Output() valueChanged: EventEmitter<string> = new EventEmitter<string>();
	onChangedValue() {
		this.valueChanged.emit(this.value);
	}
}
