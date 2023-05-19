import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-course-list',
	templateUrl: './course-list.component.html',
	styleUrls: ['./course-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent {}
