import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { action, Course, customPath } from 'src/app/utils/global.model';
import { CoursesService } from '../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
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
		this.coursesService.setCourse(
			newCourse,
			this.coursesService.isUpdating.action
		);
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
		const result = this.coursesService.isUpdating.action;
		const isUpdatingAction =
			(result === action.ADD || result === action.EDIT) &&
			this.coursesService.isUpdating.state;

		if (isUpdatingAction) {
			return result;
		} else {
			return false;
		}
	}
	get state() {
		return this.coursesService.isUpdating.state;
	}
}
