import {
	ChangeDetectionStrategy,
	Component,
	forwardRef,
	Input,
} from '@angular/core';
import {
	ControlValueAccessor,
	FormControl,
	FormGroup,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
	selector: 'app-r-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputReactiveComponent),
			multi: true,
		},
	],
})
export class InputReactiveComponent implements ControlValueAccessor {
	constructor() {}
	@Input() placeholder = 'Type here...';
	@Input() id = '';
	@Input() name = '';
	@Input() type = 'text';
	@Input() label = 'text';
	@Input() maxLength = 0;
	@Input() minLength = 0;
	@Input() parentForm!: FormGroup;
	@Input() fieldName = '';
	@Input() count = true;

	value = '';
	changed!: (value: string) => void;
	touched!: () => void;
	isDisabled = false;

	get formField(): FormControl {
		return this.parentForm?.get(this.fieldName) as FormControl;
	}

	writeValue(value: string): void {
		this.value = value;
	}
	registerOnChange(fn: (value: string) => void): void {
		this.changed = fn;
	}
	registerOnTouched(fn: () => void): void {
		this.touched = fn;
	}
	setDisabledState(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
	}
}
