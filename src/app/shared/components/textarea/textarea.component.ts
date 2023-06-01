import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';

@Component({
	selector: 'app-textarea',
	templateUrl: './textarea.component.html',
	styleUrls: ['./textarea.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent {
	@Input() name = 'textarea';
	@Input() id = 'description';
	@Input() title = 'description';
	@Input() placeholder = 'Add description';
	@Input() cols = '30';
	@Input() rows = '7';

	value = '';
	@Output() valueChanged: EventEmitter<string> = new EventEmitter<string>();
	onChangedValue() {
		this.valueChanged.emit(this.value);
	}
}
