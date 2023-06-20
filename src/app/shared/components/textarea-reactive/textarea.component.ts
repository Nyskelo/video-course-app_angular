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
	selector: 'app-r-textarea',
	templateUrl: './textarea.component.html',
	styleUrls: ['./textarea.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TextareaReactiveComponent),
			multi: true,
		},
	],
})
export class TextareaReactiveComponent implements ControlValueAccessor {
	@Input() cols = '30';
	@Input() rows = '7';
	@Input() placeholder = 'Type here...';
	@Input() maxLength = 20;
	@Input() minLength = 2;
	@Input() parentForm!: FormGroup;
	@Input() fieldName = '';

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
