import {
	ChangeDetectionStrategy,
	Component,
	computed,
	OnInit,
	signal,
	ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { action, Course } from 'src/app/utils/global.model';
import { CoursesService } from '../services/courses.service';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';

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

	courses: Course[] = [];
	filteredCourses$ = new BehaviorSubject<Course[]>([]);

	// buttons action-event
	add = action.ADD;
	edit = action.EDIT;

	// searchbar
	searchText = '';

	// pagination
	limit = 3;
	page = signal<number>(1);
	total = signal<number>(1);
	numCourse = computed(() => this.page() * this.limit - (this.limit - 1));
	startIndex = computed(() => (this.page() - 1) * this.limit);
	endIndex = computed(() => this.startIndex() + this.limit);

	getCoursesSlice(courses: Course[]) {
		return courses.slice(this.startIndex(), this.endIndex());
	}

	ngOnInit(): void {
		this.courses = this.coursesService.getCourses();
		this.filteredCourses$.next(this.getCoursesSlice(this.courses));
		this.total.set(Math.ceil(this.courses.length / this.limit));
	}

	trackCourseID(index: number, course: Course): number {
		return course.id;
	}

	changePage(page: number): void {
		if (page === this.page()) {
			return;
		}
		this.page.set(page);
		this.filteredCourses$.next(this.getCoursesSlice(this.courses));
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
		this.filteredCourses$.next(this.getCoursesSlice(updatedCourses));
	}

	onSearchClick(searchValue: string) {
		if (searchValue !== this.searchText) {
			this.onUpdateCourse(searchValue);
		}
		this.page.set(1);
		this.searchText = searchValue;
	}

	onLoadMore(): void {
		console.log('Loaded more was clicked!');
	}

	onNewCourse(action: action, course?: Course): void {
		this.coursesService.isUpdating.state = true;
		this.coursesService.isUpdating.action = action;
		action === 'Add' && this.router.navigate(['courses/new']);
		action === 'Edit' && this.router.navigate([`courses/${course?.id}`]);
	}
}
