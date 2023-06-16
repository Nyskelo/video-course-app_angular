import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-courses-reactive-form',
	templateUrl: './courses-reactive-form.component.html',
	styleUrls: ['./courses-reactive-form.component.scss'],
})
export class CoursesReactiveFormComponent {
	constructor(private fb: FormBuilder) {}
	dateFormat = { reg: /^\d{2}\/\d{2}\/\d{4}$/, format: 'dd/mm/yyyy' };
	courseForm = this.fb.group({
		title: [
			'',
			[
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(20),
				this.controlSpaces(2, 20),
			],
		],
		description: [
			'',
			[
				Validators.required,
				Validators.minLength(20),
				Validators.maxLength(500),
				this.controlSpaces(20, 500),
			],
		],
		date: ['', [Validators.required]],
		duration: ['', [Validators.required, this.greaterThenZero]],
	});

	get title() {
		return this.courseForm?.get('title');
	}
	get duration() {
		return this.courseForm?.get('duration');
	}

	controlSpaces(min: number, max: number) {
		return (controls: FormControl) => {
			let removedSpaces = controls.value.split('  ').join(' ');
			controls.value !== removedSpaces && controls.setValue(removedSpaces);
			if (controls && controls.value.trim().length < min) {
				removedSpaces = controls.value.replace(/^\s/g, '');
				controls.value !== removedSpaces && controls.setValue(removedSpaces);
				return { minLengthSpaces: true };
			}
			if (controls && controls.value.trim().length > max) {
				return { maxLengthSpaces: true };
			}

			return null;
		};
	}
	greaterThenZero(controls: FormControl) {
		const removedZeroStart = controls.value.replace(/^0/g, '');
		controls.value !== removedZeroStart && controls.setValue(removedZeroStart);

		return +controls.value >= 1
			? null
			: {
					customValidation: true,
					customValidationMsg: 'Duration should be greater than 0',
			  };
	}
}
