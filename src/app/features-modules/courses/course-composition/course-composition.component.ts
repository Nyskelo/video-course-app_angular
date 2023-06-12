import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit,
	QueryList,
	ViewChild,
	ViewChildren,
} from '@angular/core';
import { action, Course, customPath } from 'src/app/utils/global.model';
import { CoursesService } from '../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { TextareaComponent } from 'src/app/shared/components/textarea/textarea.component';

@UntilDestroy({ checkProperties: true })
@Component({
	selector: 'app-course-composition',
	templateUrl: './course-composition.component.html',
	styleUrls: ['./course-composition.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCompositionComponent implements OnInit, OnDestroy {
	constructor(
		private coursesService: CoursesService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}
	@ViewChildren(InputComponent) inputs!: QueryList<InputComponent>;
	@ViewChild(TextareaComponent) textarea!: TextareaComponent;
	ngOnDestroy(): void {
		console.log('ADD|EDIT - CourseCompos has been destroyed');
	}
	courseToUpdate!: Course;
	formattetDuration = '';

	title = '';
	description = '';
	duration = 0;
	date = '';
	authors = '';

	ngOnInit(): void {
		console.log('ADD|EDIT - CourseCompos has been init');

		this.activatedRoute.data.subscribe(({ course }) => {
			if (course) {
				this.courseToUpdate = course;
				this.formattetDuration = course.length;
				this.duration = Number(course.length);
				this.title = course.name;
				this.description = course.description;
				this.authors = course.authors[0].name;
				this.date = new Date(course.date).toISOString().substring(0, 10);
			}
		});
	}

	onInputTitleValue(value: string) {
		this.title = value;
	}
	onInputDescriptionValue(value: string) {
		this.description = value;
	}
	onInputDurationValue(value: string) {
		this.duration = Number(value);
	}
	onInputDateValue(value: string) {
		this.date = value;
	}
	onInputAuthorsValue(value: string) {
		this.authors = value;
	}

	onSave() {
		const newCourse = {
			...this.courseToUpdate,
			name: this.title,
			description: this.description,
			length: this.duration,
			date: this.date,
			authors: [{ name: this.authors, lastName: 'LN', id: Date.now() }],
			isTopRated: false,
		};
		if (this.coursesService.isUpdating.action === 'Add') {
			this.coursesService.addCourse(newCourse).subscribe();
		}
		if (this.coursesService.isUpdating.action === 'Edit') {
			this.coursesService.updateCourse(newCourse).subscribe();
		}
		this.coursesService.isUpdating.state = false;
		this.coursesService.isUpdating.action = action.SAVE;
		this.router.navigate([customPath.coursesList]);
		this.onClear();
	}

	onCancel(): void {
		this.coursesService.isUpdating.state = false;
		this.coursesService.isUpdating.action = action.CANCEL;
		this.router.navigate([customPath.coursesList]);
		this.onClear();
	}

	get action() {
		return this.router.url.match(/new$/gi) ? 'Add' : 'Edit';
	}
	get state() {
		return this.coursesService.isUpdating.state;
	}

	onClear() {
		this.inputs.forEach((input) => {
			input.value = '';
			input.valueChanged.emit(input.value);
		});
		this.textarea.valueChanged.emit('');
	}
}
