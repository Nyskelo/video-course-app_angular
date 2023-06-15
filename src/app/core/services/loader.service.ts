import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AppStateInterface } from 'src/app/store';
import * as courses from 'src/app/store/courses/selectors';
import * as user from 'src/app/store/user/selectors';

@Injectable({
	providedIn: 'root',
})
export class LoaderService {
	constructor(private store: Store<AppStateInterface>) {}

	isLoading = new Subject<boolean>();

	isLoadingUser = this.store
		.pipe(select(courses.isLoadingSelector))
		.subscribe((boolean) => this.isLoading.next(boolean));
	isLoadingCourses = this.store
		.pipe(select(user.isLoadingSelector))
		.subscribe((boolean) => this.isLoading.next(boolean));

	show() {
		this.isLoading.next(true);
	}

	hide() {
		this.isLoading.next(false);
	}
}
