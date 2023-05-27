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
import { BehaviorSubject } from 'rxjs';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { Course } from 'src/app/utils/global.model';
@Component({
	selector: 'app-course-list',
	templateUrl: './course-list.component.html',
	styleUrls: ['./course-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class CourseListComponent implements OnInit, OnChanges {
	constructor(private filterPipe: FilterPipe) {}

	@Input() courses!: Course[];
	@Input() filterBy!: string;
	@Output() deleteCourse: EventEmitter<number> = new EventEmitter();

	filteredCourses$ = new BehaviorSubject<Course[]>([]);

	ngOnChanges(changes: SimpleChanges): void {
		const updateCourses: Course[] = this.filterPipe.transform(
			this.courses,
			`${changes['filterBy']['currentValue']}`,
			'name'
		);
		this.filteredCourses$.next(updateCourses);
	}
	ngOnInit(): void {
		const updateCourses = this.filterPipe.transform(
			this.courses,
			`${this.filterBy}`,
			'name'
		);
		this.filteredCourses$.next(updateCourses);
	}

	trackCourseID(index: number, course: Course): number {
		return course.id;
	}

	onDeleteCourse(id: number) {
		this.deleteCourse.emit(id);
	}
}
