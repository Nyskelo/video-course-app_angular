import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-course-delete',
	templateUrl: './course-delete.component.html',
	styleUrls: ['./course-delete.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseDeleteComponent {}
