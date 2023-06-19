import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as CoursesActions from 'src/app/store/courses/actions';
import * as AuthorsActions from 'src/app/store/authors/actions';
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
import * as moment from 'moment';

import {
	controlSpaces,
	customRequiered,
	errorAuthorNameExpected,
	errorNameAndLastnameExpected,
	greaterThenZero,
	oneSpaceExpected,
} from '../util/form-validations.helpers';
import { authorsSelector } from 'src/app/store/authors/selectors';
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

	//Authors chips
	separatorKeysCodes: number[] = [ENTER, COMMA];
	filteredAuthors = signal<Author[]>([]);
	authorsArray = signal<Author[]>([]);
	allAuthors = signal<Author[]>([]);
	announcer = inject(LiveAnnouncer);

	//FormGroup
	dateFormat = { reg: /^\d{2}\/\d{2}\/\d{4}$/, format: 'dd/mm/yyyy' };
	courseForm = this.fb.group({
		title: [
			'',
			[
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(50),
				controlSpaces(2, 50),
			],
		],
		description: [
			'',
			[
				Validators.required,
				Validators.minLength(20),
				Validators.maxLength(500),
				controlSpaces(20, 500),
			],
		],
		date: ['', [Validators.required]],
		duration: ['', [Validators.required, greaterThenZero]],
		authors: [
			'',
			[customRequiered(() => this.authorsArray()), oneSpaceExpected],
		],
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
	get authors() {
		return this.courseForm?.get('authors');
	}

	ngOnDestroy(): void {
		console.log('ADD|EDIT - CourseCompos has been destroyed');
	}
	ngOnInit(): void {
		console.log('ADD|EDIT - CourseCompos has been init');

		//Fetch to authors
		this.store.dispatch(AuthorsActions.getAuthors());
		this.store.pipe(select(authorsSelector)).subscribe((authors) => {
			this.allAuthors.set(authors);
			this.filteredAuthors.set(authors);
		});

		// Subscribe to authors field event
		this.authors?.valueChanges
			.pipe(
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				startWith(null as any),
				map((author: string | null) => {
					if (this.authors?.invalid) {
						return null;
					}
					return author ? this._filter(author) : this.allAuthors().slice();
				})
			)
			.subscribe((authors) => {
				authors && this.filteredAuthors.set(authors);
				!authors && this.filteredAuthors.set([]);
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
		const author = (event.value || '').trim();
		if (author && author.split(' ').length < 2) {
			this.authors?.setErrors(errorNameAndLastnameExpected);
			this.authors?.markAsTouched();
			return;
		}
		if (author && !this.authors?.errors?.['customValidation']) {
			const newAuthors = {
				name: author,
				id: new Date().valueOf(),
			};
			this.store.dispatch(AuthorsActions.addAuthor({ author: newAuthors }));
			this.authorsArray.update((prev) => [...prev, newAuthors]);
			console.log('authorsArray', this.authorsArray());
		}

		// Clear the input value
		!this.authors?.errors?.['customValidation'] &&
			(event.chipInput.inputElement.value = '');
		!this.authors?.errors?.['customValidation'] && this.authors?.setValue(null);
	}
	remove(author: Author): void {
		const index = this.authorsArray().indexOf(author);
		if (index >= 0) {
			this.authorsArray().splice(index, 1);
			this.announcer.announce(`Removed ${author.name}`);
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
			(author: Author) =>
				author.name.match(regex) && !this.authorsArray().includes(author)
		);
	}

	//Course action methods
	onSave() {
		if (!this.authorsArray().length) {
			this.authors?.setErrors(errorAuthorNameExpected);
			this.authors?.markAsTouched();
			return null;
		}
		const date = (this.courseForm.value.date as string).replace(
			/(\d{2}).*(\d{2}).*(\d{4})/,
			'$2-$1-$3'
		);
		const newCourse = {
			...this.courseToUpdate,
			name: `${this.courseForm.value.title}`,
			description: `${this.courseForm.value.description}`,
			length: Number(this.courseForm.value.duration),
			date: moment(date).format('YYYY-MM-DDTHH:mm'),
			authors: this.authorsArray(),
			isTopRated: false,
		};
		if (this.coursesService.isUpdating.action === 'Add') {
			this.store.dispatch(
				CoursesActions.addCourse({
					course: { ...newCourse, id: Date.now() },
				})
			);
		}
		if (this.coursesService.isUpdating.action === 'Edit') {
			this.store.dispatch(CoursesActions.updateCourse({ course: newCourse }));
		}
		this.coursesService.isUpdating.state = false;
		this.coursesService.isUpdating.action = action.SAVE;
		this.router.navigate([customPath.coursesList]);
		return true;
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
}
