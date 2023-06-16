import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-courses-reactive-form',
	templateUrl: './courses-reactive-form.component.html',
	styleUrls: ['./courses-reactive-form.component.scss'],
})
export class CoursesReactiveFormComponent implements OnInit {
	constructor(private fb: FormBuilder) {}
	ngOnInit(): void {
		this.courseForm.valueChanges.subscribe((e) =>
			console.log(e, this.courseForm.get('title')?.invalid)
		);
	}
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
	});

	get title() {
		return this.courseForm?.get('title');
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
}
