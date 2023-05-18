import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-course-add',
	templateUrl: './course-add.component.html',
	styleUrls: ['./course-add.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseAddComponent {}
