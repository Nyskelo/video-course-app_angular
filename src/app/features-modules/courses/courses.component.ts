import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CoursesService } from './services/courses.service';

@Component({
	selector: 'app-courses',
	templateUrl: './courses.component.html',
	styleUrls: ['./courses.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent {
	constructor(private coursesService: CoursesService) {}
	get isUpdating() {
		console.log(this.coursesService.isUpdating.state);

		return this.coursesService.isUpdating.state;
	}
}
