import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	ViewEncapsulation,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { action, Course } from 'src/app/utils/global.model';
import { CoursesService } from '../services/courses.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Router } from '@angular/router';

@UntilDestroy({ checkProperties: true })
@Component({
	selector: 'app-course-list',
	templateUrl: './course-list.component.html',
	styleUrls: ['./course-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class CourseListComponent implements OnInit {
	constructor(
		private filterPipe: FilterPipe,
		private coursesService: CoursesService,
		private router: Router
	) {}

	searchText = '';
	courses: Course[] = [];
	filteredCourses$!: Observable<Course[]>;
	add = action.ADD;
	edit = action.EDIT;

	ngOnInit(): void {
		this.courses = this.coursesService.getCourses();
		this.filteredCourses$ = of(this.courses);
	}

	trackCourseID(index: number, course: Course): number {
		return course.id;
	}

	onDeleteCourseID(id: number) {
		if (
			confirm(`
DELETE THE COURSE?
You will not be able to recover it`)
		) {
			this.coursesService.removeCourseByID(id);
			this.courses = this.courses?.filter((course) => course.id !== id);
			this.onUpdateCourse(this.searchText);
		}
	}

	onUpdateCourse(searchValue: string) {
		const updatedCourses = this.filterPipe.transform(
			this.courses,
			searchValue,
			'name'
		);
		this.filteredCourses$ = of(updatedCourses);
	}

	onSearchClick(searchValue: string) {
		this.searchText = searchValue;
		this.onUpdateCourse(searchValue);
	}

	onLoadMore(): void {
		console.log('Loaded more was clicked!');
	}

	onNewCourse(action: action): void {
		this.coursesService.isUpdating.state = true;
		this.coursesService.isUpdating.action = action;
		action === 'Add' && this.router.navigate(['courses/new']);
		action === 'Edit' && this.router.navigate(['courses/id']);
	}
}
