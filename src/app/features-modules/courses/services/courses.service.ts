import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, Subject, tap } from 'rxjs';
import { storeTranslate } from 'src/app/core/components/header/header.component';
import {
	action,
	Author,
	Course,
	CourseState,
} from 'src/app/utils/global.model';

@Injectable({
	providedIn: 'root',
})
export class CoursesService {
	constructor(private http: HttpClient) {}
	courses: Course[] | undefined;
	isUpdating: CourseState = {
		state: false,
		action: action.CANCEL,
	};

	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
	};
	url = `http://localhost:3004/courses`;
	urlAuthors = `http://localhost:3004/authors`;

	private _saveOperationSuccessfulEvent$: Subject<{
		action: action;
		course?: Course;
		author?: Author;
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
				retry(2)
			);
	}
	getAuthors() {
		return this.http.get<Author[]>(`${this.urlAuthors}`).pipe(
			tap((data) => {
				console.log(`fetched ${data.length} authors`);
				this._saveOperationSuccessfulEvent$.next({
					action: data.length ? action.GET : action.EMPTY,
				});
			}),
			retry(2)
		);
	}

	getCourseByID(id: number) {
		return this.http
			.get<Course>(`${this.url}/${id}`)
			.pipe(tap(() => console.log(`fetched course id=${id}`)));
	}

	searchCourses(term: string): Observable<Course[]> {
		return this.http
			.get<Course[]>(`${this.url}`, {
				params: { sort: 'date', textFragment: `${term}` },
			})
			.pipe(
				tap((x) => {
					x.length
						? this._searchResultSubject$.next(
								// `found ${x.length} courses matching "${term}"`
								storeTranslate.instant('courses.courses-search-data', {
									value1: x.length,
									value2: term,
								})
						  )
						: this._searchResultSubject$.next(
								// `no courses matching "${term}"`
								storeTranslate.instant('courses.courses-search-nodata', {
									value: term,
								})
						  ),
						this._saveOperationSuccessfulEvent$.next({
							action: x.length ? action.SEARCH : action.EMPTY,
						});
				})
			);
	}

	updateCourse(course: Course) {
		return this.http
			.put(`${this.url}/${course.id}`, course, this.httpOptions)
			.pipe(
				tap(() => {
					console.log(`updated course id=${course.id}`);
					this._saveOperationSuccessfulEvent$.next({
						action: action.EDIT,
						course: course,
					});
				})
			);
	}

	addCourse(course: Course) {
		return this.http.post<Course>(`${this.url}`, course, this.httpOptions).pipe(
			tap((newCourse: Course) => {
				console.log(`added course w/ id=${newCourse.id}`);
				this._saveOperationSuccessfulEvent$.next({
					action: action.ADD,
					course: newCourse,
				});
			})
		);
	}

	addAuthor(author: Author) {
		return this.http
			.post<Author>(`${this.urlAuthors}`, author, this.httpOptions)
			.pipe(
				tap((newAuthor: Author) => {
					console.log(`added author w/ id=${newAuthor.id}`);
					this._saveOperationSuccessfulEvent$.next({
						action: action.ADD,
						author: newAuthor,
					});
				})
			);
	}

	deleteCourse(course: Course) {
		return this.http
			.delete<Course[]>(`${this.url}/${course.id}`, this.httpOptions)
			.pipe(
				tap(() => {
					console.log(`deleted course id=${course.id}`);
					this._saveOperationSuccessfulEvent$.next({
						action: action.DELETE,
						course: course,
					});
				})
			);
	}

	deleteAuthor(author: Author) {
		return this.http
			.delete<Author[]>(`${this.urlAuthors}/${author.id}`, this.httpOptions)
			.pipe(
				tap(() => {
					console.log(`deleted author id=${author.id}`);
					this._saveOperationSuccessfulEvent$.next({
						action: action.DELETE,
						author: author,
					});
				})
			);
	}
}
