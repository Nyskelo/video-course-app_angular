import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as CoursesActions from 'src/app/store/courses/actions';
import { AppStateInterface } from 'src/app/store';
import { UntilDestroy } from '@ngneat/until-destroy';
import { CoursesService } from '../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { action, Course, customPath } from 'src/app/utils/global.model';

@UntilDestroy({ checkProperties: true })
@Component({
	selector: 'app-courses-reactive-form',
	templateUrl: './courses-reactive-form.component.html',
	styleUrls: ['./courses-reactive-form.component.scss'],
})
export class CoursesReactiveFormComponent implements OnInit, OnDestroy {
	constructor(
		private fb: FormBuilder,
		private coursesService: CoursesService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private store: Store<AppStateInterface>
	) {}
	courseToUpdate!: Course;
	authors = '';
	ngOnDestroy(): void {
		console.log('ADD|EDIT - CourseCompos has been destroyed');
	}
	ngOnInit(): void {
		console.log('ADD|EDIT - CourseCompos has been init');

		this.activatedRoute.data.subscribe(({ course }) => {
			if (course) {
				this.courseToUpdate = course;
				this.authors = course.authors[0].name;
				this.duration?.setValue(course.length);
				this.title?.setValue(course.name);
				this.description?.setValue(course.description);
				this.date?.setValue(
					new Date(course.date).toLocaleDateString('en-GB', {
						day: 'numeric',
						month: 'numeric',
						year: 'numeric',
					})
				);
			}
		});
	}
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
	get description() {
		return this.courseForm?.get('description');
	}
	get date() {
		return this.courseForm?.get('date');
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
		const removedZeroStart = controls.value;
		controls.value !== removedZeroStart && controls.setValue(+removedZeroStart);
		const isValid = +controls.value >= 1 && !/^0/g.test(controls.value);
		const isInValidZero =
			/^0/g.test(controls.value) && controls.value.length > 1;
		const msg = isInValidZero
			? 'Duration cannot start with 0'
			: 'Duration should be greater than 0';
		return isValid
			? null
			: {
					customValidation: true,
					customValidationMsg: msg,
			  };
	}
	onSave() {
		const newCourse = {
			...this.courseToUpdate,
			name: this.courseForm.value.title as string,
			description: this.courseForm.value.description as string,
			length: Number(this.courseForm.value.duration),
			date: new Date(this.courseForm.value.date as string).toLocaleDateString(
				'en-GB',
				{
					day: 'numeric',
					month: 'numeric',
					year: 'numeric',
				}
			),
			authors: [{ name: this.authors, lastName: 'LN', id: Date.now() }],
			isTopRated: false,
		};
		if (this.coursesService.isUpdating.action === 'Add') {
			this.store.dispatch(
				CoursesActions.addCourse({ course: { ...newCourse, id: Date.now() } })
			);
		}
		if (this.coursesService.isUpdating.action === 'Edit') {
			this.store.dispatch(CoursesActions.updateCourse({ course: newCourse }));
		}
		this.coursesService.isUpdating.state = false;
		this.coursesService.isUpdating.action = action.SAVE;
		this.router.navigate([customPath.coursesList]);
	}

	onCancel(): void {
		this.coursesService.isUpdating.state = false;
		this.coursesService.isUpdating.action = action.CANCEL;
		this.router.navigate([customPath.coursesList]);
	}

	get action() {
		return this.router.url.match(/new$/gi) ? 'Add' : 'Edit';
	}
	get state() {
		return this.coursesService.isUpdating.state;
	}

	onClear() {
		this.courseForm.reset();
		// this.inputs.forEach((input) => {
		// 	input.value = '';
		// 	input.valueChanged.emit(input.value);
		// });
		// this.textarea.valueChanged.emit('');
	}
}
