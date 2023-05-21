import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
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
export class CourseListComponent implements OnInit, OnChanges {
	@Input() courses!: Course[];
	@Output() deleteCourse: EventEmitter<string> = new EventEmitter();

	ngOnChanges(changes: SimpleChanges): void {
		console.log(`Change detected occurred:`, changes);
	}
	ngOnInit(): void {
		console.log(`List of courses has been created!`);
	}

	trackCourseID(index: number, course: Course): string {
		return course.id;
	}

	onDeleteCourse(id: string) {
		this.deleteCourse.emit(id);
	}
}
