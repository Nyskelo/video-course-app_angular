import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as CoursesActions from 'src/app/store/courses/actions';
import { AppStateInterface } from 'src/app/store';
import { UntilDestroy } from '@ngneat/until-destroy';
import { CoursesService } from '../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { action, Author, Course, customPath } from 'src/app/utils/global.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild, inject } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith } from 'rxjs/operators';
import { LiveAnnouncer } from '@angular/cdk/a11y';

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
	@ViewChild('authorsInput') authorsInput!: ElementRef<HTMLInputElement>;

	courseToUpdate!: Course;

	//FormGroup
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
		authors: ['', [Validators.required]],
	});

	//Authors chips
	separatorKeysCodes: number[] = [ENTER, COMMA];
	filteredAuthors = signal<Author[]>([]);
	authorsArray = signal<Author[]>([]);
	allAuthors = signal<Author[]>([]);
	announcer = inject(LiveAnnouncer);

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
	get authors() {
		return this.courseForm?.get('authors');
	}

	ngOnDestroy(): void {
		console.log('ADD|EDIT - CourseCompos has been destroyed');
	}
	ngOnInit(): void {
		console.log('ADD|EDIT - CourseCompos has been init');
		//Subscribe to authors field event
		this.authors?.valueChanges
			.pipe(
				startWith(null),
				map((fruit: string | null) =>
					fruit ? this._filter(fruit) : this.allAuthors().slice()
				)
			)
			.subscribe((authors) => {
				this.filteredAuthors.set(authors);
			});

		//Set course to update
		this.activatedRoute.data.subscribe(({ course }) => {
			if (course) {
				this.courseToUpdate = course;
				this.authors?.setValue(course.authors);
				this.authorsArray.set(course.authors);
				this.allAuthors.set(course.authors);
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

	//Authors chips field methods
	add(event: MatChipInputEvent): void {
		const author = (event.value || '').split(' ');
		if (author) {
			this.authorsArray.update((prev) => [
				...prev,
				{
					name: author[0],
					lastName: author[1] || author[0],
					id: new Date().valueOf(),
				},
			]);
		}

		// Clear the input value
		event.chipInput.inputElement.value = '';
		this.authors?.setValue(null);
	}
	remove(author: Author): void {
		const index = this.authorsArray().indexOf(author);
		if (index >= 0) {
			this.authorsArray().splice(index, 1);
			this.announcer.announce(`Removed ${author.name} ${author.lastName}`);
		}
	}
	selected(event: MatAutocompleteSelectedEvent): void {
		this.authorsArray.update((prev) => [...prev, event.option.value]);
		this.authorsInput.nativeElement.value = '';
		this.authors?.setValue(null);
	}
	private _filter(value: string): Author[] {
		const regex = new RegExp(value, 'gi');
		return this.allAuthors().filter(
			(fruit: Author) =>
				fruit.name.match(regex) || fruit?.lastName?.match(regex)
		);
	}

	//Form validations methods
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

	//Course action methods
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
			authors: this.authorsArray(),
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
		console.log(newCourse);
	}
	onCancel(): void {
		this.coursesService.isUpdating.state = false;
		this.coursesService.isUpdating.action = action.CANCEL;
		this.router.navigate([customPath.coursesList]);
	}
	onClear() {
		this.courseForm.reset();
	}

	get action() {
		return this.router.url.match(/new$/gi) ? 'Add' : 'Edit';
	}
	get state() {
		return this.coursesService.isUpdating.state;
	}
}
