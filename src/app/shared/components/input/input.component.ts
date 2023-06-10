import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	ViewChild,
} from '@angular/core';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
	@ViewChild('input', { static: true }) input!: ElementRef;

	@Input() name = '';
	@Input() id = '';
	@Input() type = 'text';
	@Input() title = 'text';
	@Input() placeholder = 'Type here...';
	@Input() value = '';

	@Output() valueChanged: EventEmitter<string> = new EventEmitter<string>();

	onChangedValue() {
		this.valueChanged.emit(this.value);
	}

	get inputRef() {
		return this.input;
	}
}
