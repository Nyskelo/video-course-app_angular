import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CoursesService } from 'src/app/features-modules/courses/services/courses.service';
import { Course } from 'src/app/utils/global.model';

@Injectable({ providedIn: 'root' })
export class CoursesResolver {
	constructor(private service: CoursesService) {}

	resolve(
		route: ActivatedRouteSnapshot
	): Observable<Course | undefined> | Promise<Course> | Course | undefined {
		return of(this.service.getCourseByID(Number(route.paramMap.get('id'))));
	}
}
