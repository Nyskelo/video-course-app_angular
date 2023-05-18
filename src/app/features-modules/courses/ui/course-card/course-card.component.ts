import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-course-card',
	templateUrl: './course-card.component.html',
	styleUrls: ['./course-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCardComponent {}
