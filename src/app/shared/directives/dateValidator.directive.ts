import { Directive, Input } from '@angular/core';
import {
	AbstractControl,
	NG_VALIDATORS,
	ValidationErrors,
	Validator,
} from '@angular/forms';

@Directive({
	selector: '[appDateValidator]',
	providers: [
		{
			provide: NG_VALIDATORS,
			useExisting: DateValidatorDirective,
			multi: true,
		},
	],
})
export class DateValidatorDirective implements Validator {
	@Input() appDateValidator!: { reg: RegExp; format: string; error: string };
	validate(control: AbstractControl): ValidationErrors | null {
		const correctFormat = this.appDateValidator.reg.test(control.value);
		return !correctFormat
			? {
					customValidation: true,
					customValidationMsg: this.appDateValidator.error,
			  }
			: null;
	}
}
