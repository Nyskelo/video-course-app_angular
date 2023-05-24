import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
	ViewEncapsulation,
} from '@angular/core';
import { Course } from 'src/app/utils/global.model';
@Component({
	selector: 'app-course-list',
	templateUrl: './course-list.component.html',
	styleUrls: ['./course-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class CourseListComponent {
	@Input() courses!: Course[];
	@Output() deleteCourse: EventEmitter<number> = new EventEmitter();

	trackCourseID(index: number, course: Course): number {
		return course.id;
	}

	onDeleteCourse(id: number) {
		this.deleteCourse.emit(id);
	}
}
