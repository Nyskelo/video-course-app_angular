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
	Observable,
	Subject,
	Subscription,
	tap,
} from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';
import { SearchbarComponent } from 'src/app/shared/components/searchbar/searchbar.component';
import { Store, select } from '@ngrx/store';
import {
	AppStateInterface,
	coursesSelector,
	errorSelector,
	isLoadingSelector,
} from '../store/selectors';
import * as CoursesActions from 'src/app/features-modules/courses/store/actions';

@UntilDestroy({ checkProperties: true })
@Component({
	selector: 'app-course-list',
	templateUrl: './course-list.component.html',
	styleUrls: ['./course-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class CourseListComponent implements OnInit, OnDestroy, AfterViewInit {
	isLoading$!: Observable<boolean>;
	error$: Observable<string | null>;
	courses$: Observable<Course[]>;
	constructor(
		private filterPipe: FilterPipe,
		private coursesService: CoursesService,
		private router: Router,
		private http: HttpClient,
		private store: Store<AppStateInterface>
	) {
		this.isLoading$ = this.store.pipe(select(isLoadingSelector));
		this.error$ = this.store.pipe(select(errorSelector));
		this.courses$ = this.store.pipe(select(coursesSelector));
	}
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
	countToFetch = computed(
		() =>
			this.pageSize() * this.limitToDisplay - this.coursesSub$().length ||
			this.limitToDisplay
	);

	startIndex = computed(() => (this.currentPage() - 1) * this.limitToDisplay);
	endIndex = computed(() => this.startIndex() + this.limitToDisplay);
	coursesNumeration = computed(
		() => this.currentPage() * this.limitToDisplay - this.limitToDisplay + 1
	);

	loadMore_disebled = !(this.coursesSub$().length <= this.limitToDisplay);

	ngOnInit(): void {
		//init fetch
		this.store.dispatch(
			CoursesActions.getCourses({
				start: 0,
				count: this.countToFetch(),
			})
		);
		//--->subsctibe to Edit / Add / Delete actions
		this.saveOperationSuccessfulSubscription =
			this.coursesService.saveOperationSuccessfulEvent$.subscribe((res) => {
				res.action !== action.EMPTY && this.setCoursesView();
				(res.action === action.SEARCH || res.action === action.EMPTY) &&
					(this.loadMore_disebled = true);
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
				tap((term) => {
					if (term) {
						this.store.dispatch(
							CoursesActions.searchCourses({
								term,
							})
						);
					} else {
						this.store.dispatch(
							CoursesActions.getCourses({
								start: 0,
								count: this.countToFetch(),
							})
						);
					}
				})
			)
			.subscribe();
	}

	//fetch more data
	onLoadMore(): void {
		this.searchText !== '' && this.child.onClear();
		this.store.dispatch(
			CoursesActions.getCourses({
				start: this.startToFetch(),
				count: this.countToFetch(),
			})
		);
	}

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
			this.store.dispatch(
				CoursesActions.deleteCourse({
					course: course,
				})
			);
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

	setCoursesView() {
		this.courses$.subscribe((data) => {
			this.initState = true;
			this.coursesSub$.set(data);
			this.setPagesSize(this.coursesSub$());
			this.coursesSliceSub$.set(this.getCoursesSliceByPage(this.coursesSub$()));
			this.currentPage.set(this.pageSize() || 1);
		});
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
