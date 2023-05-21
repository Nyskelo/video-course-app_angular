import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnChanges,
	OnInit,
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

	ngOnChanges(changes: SimpleChanges): void {
		console.log(`Change detected occurred:`, changes);
	}
	ngOnInit(): void {
		console.log(`List of courses has been created!`);
	}

	trackCourseID(index: number, course: Course): string {
		return course.id;
	}
}
