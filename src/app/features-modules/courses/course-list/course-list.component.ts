import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	computed,
	OnDestroy,
	OnInit,
	signal,
	ViewChild,
	ViewEncapsulation,
} from '@angular/core';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { action, Course } from 'src/app/utils/global.model';
import { CoursesService } from '../services/courses.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {
	debounceTime,
	distinctUntilChanged,
	filter,
	Subject,
	Subscription,
	switchMap,
	tap,
} from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';
import { SearchbarComponent } from 'src/app/shared/components/searchbar/searchbar.component';

@UntilDestroy({ checkProperties: true })
@Component({
	selector: 'app-course-list',
	templateUrl: './course-list.component.html',
	styleUrls: ['./course-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class CourseListComponent implements OnInit, OnDestroy, AfterViewInit {
	constructor(
		private filterPipe: FilterPipe,
		private coursesService: CoursesService,
		private router: Router,
		private http: HttpClient
	) {}
	@ViewChild(SearchbarComponent) child!: SearchbarComponent;

	ngOnDestroy(): void {
		console.log('LIST - CourseList has been destroyed');
	}
	initState = false;
	coursesSub$ = signal<Course[]>([]);
	coursesSliceSub$ = signal<Course[]>([]);
	saveOperationSuccessfulSubscription!: Subscription;

	// buttons action-event
	add = action.ADD;
	edit = action.EDIT;

	// searchbar
	searchText = '';
	inputSearch$: Subject<string> = new Subject();
	inputEventSubscription!: Subscription;
	searchResult = signal('');

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
			this.coursesService.saveOperationSuccessfulEvent$
				.pipe(
					tap((res) => {
						if (res.action === action.DELETE) {
							this.coursesSub$.set(
								this.coursesSub$().filter((el) => el.id !== res.id)
							);
							this.setPagesSize(this.coursesSub$());
							this.currentPage.set(this.pageSize() || 1);
							this.coursesSliceSub$.set(
								this.getCoursesSliceByPage(this.coursesSub$())
							);
						}
					})
				)
				.subscribe((res) => {
					res.action !== action.DELETE &&
						this.coursesService.getCourseByID(res.id).subscribe((data) => {
							switch (res.action) {
								case action.EDIT:
									this.coursesSub$.set(
										this.coursesSub$()
											.filter((el) => el.id !== res.id)
											.concat(data)
									);
									break;

								case action.ADD:
									this.coursesSub$.mutate((values) =>
										values.push(data as Course)
									);
									this.setPagesSize(this.coursesSub$());
									this.currentPage.set(this.pageSize() || 1);
									break;
							}
							//--->update list of courses by current page
							this.coursesSliceSub$.set(
								this.getCoursesSliceByPage(this.coursesSub$())
							);
							window.scrollTo(0, document.body.scrollHeight);
						});
				});
	}

	ngAfterViewInit(): void {
		//--->subsctibe to search result matching
		this.coursesService.searchResultSubject$.subscribe((msg) => {
			this.searchResult.set(msg);
			setTimeout(() => {
				this.searchResult.set('');
			}, 1500);
		});

		//--->subsctibe to search input event
		this.inputEventSubscription = this.inputSearch$
			.pipe(
				filter((term) => term.trim().length > 2 || term.length === 0),
				tap((term) => {
					term.length === 0
						? (this.loadMore_disebled = false)
						: (this.loadMore_disebled = true);
				}),
				debounceTime(500),
				distinctUntilChanged((a, b) => {
					const regex = new RegExp(`${a}`, 'gi');
					if (this.coursesSub$().length <= 1 && b.match(regex)) {
						return true;
					}
					return a === b;
				}),
				switchMap((term) =>
					term
						? this.coursesService.searchCourses(term)
						: this.coursesService.getCourses(0, this.countToFetch - 1)
				)
			)
			.subscribe((data) => {
				this.coursesSub$.set(data);
				this.coursesSliceSub$.set(this.coursesSub$());
				this.setPagesSize(this.coursesSub$());
				this.currentPage.set(1);
			});
	}

	//fetch more data
	onLoadMore(page: number): void {
		this.searchText !== '' && this.child.onClear();
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
		this.searchText = searchValue;
		this.inputSearch$.next(searchValue);
	}

	onBuildCourse(action: action, course?: Course): void {
		this.coursesService.isUpdating.state = true;
		this.coursesService.isUpdating.action = action;
		action === this.add && this.router.navigate(['courses/new']);
		action === this.edit && this.router.navigate([`courses/${course?.id}`]);
		this.searchText !== '' && this.child.onClear();
	}

	initFetchCoursesFromAPI() {
		this.coursesService.getCourses(0, this.countToFetch).subscribe((data) => {
			data = this.checkAndReturn(data);

			this.initState = true;
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
