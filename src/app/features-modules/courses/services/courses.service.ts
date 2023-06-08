import {
	HttpClient,
	HttpErrorResponse,
	HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, retry, Subject, tap } from 'rxjs';
import { action, Course, CourseState } from 'src/app/utils/global.model';

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

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: HttpErrorResponse): Observable<T> => {
			console.log(`${operation} failed: ${error.message}`);
			return of(result as T);
		};
	}

	private _saveOperationSuccessfulEvent$: Subject<{
		action: action;
		id: number;
	}> = new Subject();

	get saveOperationSuccessfulEvent$(): Observable<{
		action: action;
		id: number;
	}> {
		return this._saveOperationSuccessfulEvent$.asObservable();
	}

	getCourses(start = 0, count?: number) {
		return this.http
			.get<Course[]>(`${this.url}?start=${start}&count=${count}`, {
				params: { sort: 'date' },
			})
			.pipe(
				tap((data) => console.log(`fetched ${data.length} courses`)),
				retry(2),
				catchError(this.handleError<Course[]>('getCourses', []))
			);
	}

	getCourseByID(id: number) {
		return this.http.get<Course[]>(`${this.url}/${id}`).pipe(
			tap(() => console.log(`fetched course id=${id}`)),
			catchError(this.handleError<Course>(`getCourseByID id=${id}`))
		);
	}

	searchCourses(term: string): Observable<Course[]> {
		return this.http
			.get<Course[]>(`${this.url}`, {
				params: { sort: 'date', textFragment: `${term}` },
			})
			.pipe(
				tap((x) =>
					x.length
						? console.log(`found ${x.length} courses matching "${term}"`)
						: console.log(`no courses matching "${term}"`)
				),
				catchError(this.handleError<Course[]>('searchCourses', []))
			);
	}

	updateCourse(course: Course) {
		return this.http
			.put(`${this.url}/${course.id}`, course, this.httpOptions)
			.pipe(
				tap(() => console.log(`updated course id=${course.id}`)),
				map(() =>
					this._saveOperationSuccessfulEvent$.next({
						action: action.EDIT,
						id: course.id,
					})
				),
				catchError(this.handleError<Course>('updateCourse'))
			);
	}

	addCourse(course: Course) {
		return this.http.post<Course>(`${this.url}`, course, this.httpOptions).pipe(
			tap((newCourse: Course) => {
				console.log(`added course w/ id=${newCourse.id}`);
			}),
			map((course) =>
				this._saveOperationSuccessfulEvent$.next({
					action: action.ADD,
					id: course.id,
				})
			),
			catchError(this.handleError<Course>('addCourse'))
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
						id: course.id,
					});
				}),
				catchError(this.handleError<Course>('deleteCourse'))
			);
	}
}
