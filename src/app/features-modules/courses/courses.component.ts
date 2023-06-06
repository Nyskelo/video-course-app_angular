import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CoursesService } from './services/courses.service';

@Component({
	selector: 'app-courses',
	templateUrl: './courses.component.html',
	styleUrls: ['./courses.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent {
	constructor(
		private coursesService: CoursesService,
		private titleService: Title
	) {}
	get routeTitle() {
		return this.titleService.getTitle();
	}
	get isUpdating() {
		return this.coursesService.isUpdating.state;
	}
}
