import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/store';
import { userSelector } from 'src/app/store/user/selectors';
import { User } from 'src/app/utils/global.model';

@Injectable()
export class AuthTokenInterceptorService implements HttpInterceptor {
	user$!: Observable<User>;
	constructor(private store: Store<AppStateInterface>) {
		this.user$ = this.store.pipe(select(userSelector));
	}
	intercept<T>(
		req: HttpRequest<T>,
		next: HttpHandler
	): Observable<HttpEvent<T>> {
		let user = new User();
		this.user$.subscribe((userStore) => {
			user = userStore;
		});
		if (!user) {
			return next.handle(req);
		}
		const modifiedReq = req.clone({
			params: req.params.append('auth', user.fakeToken),
		});
		return next.handle(modifiedReq);
	}
}
