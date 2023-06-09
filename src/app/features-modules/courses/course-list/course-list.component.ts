import {
	ChangeDetectionStrategy,
	Component,
	computed,
	OnInit,
	signal,
	ViewEncapsulation,
} from '@angular/core';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { action, Course } from 'src/app/utils/global.model';
import { CoursesService } from '../services/courses.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
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
		private router: Router,
		private http: HttpClient
	) {}

	coursesSub$ = signal<Course[]>([]);
	coursesSliceSub$ = signal<Course[]>([]);
	saveOperationSuccessfulSubscription!: Subscription;

	// buttons action-event
	add = action.ADD;
	edit = action.EDIT;

	// searchbar
	searchText = '';

	// pagination
	limitToDisplay = 5;
	pageSize = signal<number>(1);
	currentPage = signal<number>(1);

	startToFetch = computed(
		() =>
			(Math.ceil(this.coursesSub$().length / this.limitToDisplay) || 1) *
			this.limitToDisplay
	);
	countToFetch = this.limitToDisplay + 1;
	startIndex = computed(() => (this.currentPage() - 1) * this.limitToDisplay);
	endIndex = computed(() => this.startIndex() + this.limitToDisplay);
	coursesNumeration = computed(
		() => this.currentPage() * this.limitToDisplay - (this.limitToDisplay - 1)
	);

	loadMore_disebled = !(this.coursesSub$().length <= this.limitToDisplay);

	ngOnInit(): void {
		//init fetch
		this.initFetchCoursesFromAPI();
		//--->subsctibe to Edit / Add / Delete actions
		this.saveOperationSuccessfulSubscription =
			this.coursesService.saveOperationSuccessfulEvent$.subscribe((res) => {
				this.coursesService.getCourseByID(res.id).subscribe((data) => {
					if (res.action === action.EDIT) {
						//→update course
						this.coursesSub$.set(
							this.coursesSub$()
								.filter((el) => el.id !== res.id)
								.concat(data)
						);
					} else {
						res.action === action.DELETE &&
							//→delete course
							this.coursesSub$.set(
								this.coursesSub$().filter((el) => el.id !== res.id)
							);

						res.action === action.ADD &&
							//→add course
							this.coursesSub$.mutate((values) => values.push(data as Course));

						//--->update pages count and current page
						this.setPagesSize(this.coursesSub$());
						this.currentPage.set(this.pageSize() || 1);
					}

					//--->update list of courses by current page
					this.coursesSliceSub$.set(
						this.getCoursesSliceByPage(this.coursesSub$())
					);
				});
			});
	}

	//fetch more data
	onLoadMore(page: number): void {
		this.coursesService
			.getCourses(this.startToFetch(), this.countToFetch)
			.subscribe((data) => {
				data = this.checkAndReturn(data);

				this.coursesSub$.set([...this.coursesSub$(), ...data]);
				this.setPagesSize(this.coursesSub$());
				this.coursesSliceSub$.set(
					this.getCoursesSliceByPage(this.coursesSub$())
				);
				this.currentPage.set(page);
			});
	}

	//update list of courses by current page
	onChangePage(page: number): void {
		if (page === this.currentPage()) {
			return;
		}
		this.currentPage.set(page);
		this.coursesSliceSub$.set(this.getCoursesSliceByPage(this.coursesSub$()));
	}

	onDeleteCourse(course: Course) {
		if (
			confirm(`
❓ DELETE THE COURSE
You will not be able to recover it`)
		)
			this.coursesService.deleteCourse(course).subscribe();
	}

	onSearchClick(searchValue: string) {
		if (searchValue !== this.searchText) {
			this.loadMore_disebled = true;
			this.coursesService.searchCourses(searchValue).subscribe((data) => {
				this.coursesSub$.set(data);
				this.coursesSliceSub$.set(this.coursesSub$());
				this.setPagesSize(this.coursesSub$());
				this.currentPage.set(1);
			});
		} else {
			this.loadMore_disebled && this.initFetchCoursesFromAPI();
			this.loadMore_disebled = false;
		}
	}

	onBuildCourse(action: action, course?: Course): void {
		this.coursesService.isUpdating.state = true;
		this.coursesService.isUpdating.action = action;
		action === this.add && this.router.navigate(['courses/new']);
		action === this.edit && this.router.navigate([`courses/${course?.id}`]);
	}

	initFetchCoursesFromAPI() {
		this.coursesService.getCourses(0, this.countToFetch).subscribe((data) => {
			data = this.checkAndReturn(data);

			this.coursesSub$.set(data);
			this.setPagesSize(this.coursesSub$());
			this.coursesSliceSub$.set(this.getCoursesSliceByPage(data));
			this.currentPage.set(this.pageSize() || 1);
		});
	}

	checkAndReturn(data: Course[]) {
		this.isFullyLoaded(data);
		const isPlenty = data.length === this.countToFetch;
		//Delete course added to check if next fetch true
		const slice = data.slice(0, -1);
		data = isPlenty ? slice : data;

		return data;
	}
	isFullyLoaded(data: Course[]) {
		//Disable the 'load more' button if nothing left to fetch from the server
		const result =
			data.length < this.countToFetch || data.length < this.limitToDisplay;

		result ? (this.loadMore_disebled = true) : false;
	}
	setPagesSize(courses: Course[]) {
		this.pageSize.set(Math.ceil(courses.length / this.limitToDisplay));
	}
	getCoursesSliceByPage(courses: Course[]) {
		return courses.slice(this.startIndex(), this.endIndex());
	}
	trackCourseID(index: number, course: Course): number {
		return course.id;
	}
}
