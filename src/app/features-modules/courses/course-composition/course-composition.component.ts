import { ChangeDetectionStrategy, Component } from '@angular/core';
import { action } from 'src/app/utils/global.model';
import { CoursesService } from '../services/courses.service';

@Component({
	selector: 'app-course-composition',
	templateUrl: './course-composition.component.html',
	styleUrls: ['./course-composition.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCompositionComponent {
	constructor(private coursesService: CoursesService) {}
	title = '';
	description = '';
	duration = 0;
	date = '';
	authors = '';

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
			title: this.title,
			description: this.description,
			duration: this.duration,
			date: this.date,
			authors: this.authors,
		};
		this.coursesService.isUpdating.state = false;
		this.coursesService.isUpdating.action = action.SAVE;
		alert(`New course has been added: ${JSON.stringify(newCourse)}`);
	}

	onCancel(): void {
		this.coursesService.isUpdating.state = false;
		this.coursesService.isUpdating.action = action.CANCEL;
	}

	get action() {
		return this.coursesService.isUpdating.action;
	}
}
