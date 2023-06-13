import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/store';
import { isLoggedInSelector } from 'src/app/store/user/selectors';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class isLoggedInGuard {
	userAuth$!: Observable<boolean>;
	constructor(private router: Router, private store: Store<AppStateInterface>) {
		this.userAuth$ = this.store.pipe(select(isLoggedInSelector));
	}
	canActivate() {
		this.userAuth$.subscribe((res) => {
			if (!res) {
				this.router.navigate(['/login']);
				return false;
			}
			return true;
		});
	}
}
