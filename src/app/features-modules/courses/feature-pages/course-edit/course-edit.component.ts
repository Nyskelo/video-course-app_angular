import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-course-edit',
	templateUrl: './course-edit.component.html',
	styleUrls: ['./course-edit.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseEditComponent {}
