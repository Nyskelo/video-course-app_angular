import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, retry, Subject, tap } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';
import { action, Course, CourseState } from 'src/app/utils/global.model';

@Injectable({
	providedIn: 'root',
})
export class CoursesService {
	constructor(private http: HttpClient, private loader: LoaderService) {}
	courses: Course[] | undefined;
	isUpdating: CourseState = {
		state: false,
		action: action.CANCEL,
	};

	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
	};
	url = `http://localhost:3004/courses`;

	private _saveOperationSuccessfulEvent$: Subject<{
		action: action;
		course?: Course;
	}> = new Subject();

	private _searchResultSubject$: Subject<string> = new Subject();

	get saveOperationSuccessfulEvent$(): Observable<{
		action: action;
		course?: Course;
	}> {
		return this._saveOperationSuccessfulEvent$.asObservable();
	}

	get searchResultSubject$(): Observable<string> {
		return this._searchResultSubject$.asObservable();
	}

	getCourses(start?: number, count?: number) {
		this.loader.show();
		let params = new HttpParams().append('sort', 'date');
		start && (params = params.append('start', start));
		count && (params = params.append('count', count));

		return this.http
			.get<Course[]>(`${this.url}`, {
				params,
			})
			.pipe(
				tap((data) => {
					console.log(`fetched ${data.length} courses`);
					this._saveOperationSuccessfulEvent$.next({
						action: data.length ? action.GET : action.EMPTY,
					});
				}),
				retry(2),
				finalize(() => this.loader.hide())
			);
	}

	getCourseByID(id: number) {
		this.loader.show();
		return this.http.get<Course>(`${this.url}/${id}`).pipe(
			tap(() => console.log(`fetched course id=${id}`)),
			finalize(() => this.loader.hide())
		);
	}

	searchCourses(term: string): Observable<Course[]> {
		this.loader.show();
		return this.http
			.get<Course[]>(`${this.url}`, {
				params: { sort: 'date', textFragment: `${term}` },
			})
			.pipe(
				tap((x) => {
					x.length
						? this._searchResultSubject$.next(
								`found ${x.length} courses matching "${term}"`
						  )
						: this._searchResultSubject$.next(`no courses matching "${term}"`),
						this._saveOperationSuccessfulEvent$.next({
							action: x.length ? action.SEARCH : action.EMPTY,
						});
				}),
				finalize(() => this.loader.hide())
			);
	}

	updateCourse(course: Course) {
		this.loader.show();
		return this.http
			.put(`${this.url}/${course.id}`, course, this.httpOptions)
			.pipe(
				tap(() => {
					console.log(`updated course id=${course.id}`);
					this._saveOperationSuccessfulEvent$.next({
						action: action.EDIT,
						course: course,
					});
				}),
				finalize(() => this.loader.hide())
			);
	}

	addCourse(course: Course) {
		this.loader.show();
		return this.http.post<Course>(`${this.url}`, course, this.httpOptions).pipe(
			tap((newCourse: Course) => {
				console.log(`added course w/ id=${newCourse.id}`);
				this._saveOperationSuccessfulEvent$.next({
					action: action.ADD,
					course: newCourse,
				});
			}),
			finalize(() => this.loader.hide())
		);
	}

	deleteCourse(course: Course) {
		this.loader.show();
		return this.http
			.delete<Course[]>(`${this.url}/${course.id}`, this.httpOptions)
			.pipe(
				tap(() => {
					console.log(`deleted course id=${course.id}`);
					this._saveOperationSuccessfulEvent$.next({
						action: action.DELETE,
						course: course,
					});
					this.loader.hide();
				}),
				finalize(() => this.loader.hide())
			);
	}
}
