import { Injectable } from '@angular/core';
import { finalize, map, of } from 'rxjs';
import { customPath, User, UserAuth } from 'src/app/utils/global.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/store';
import * as UserActions from 'src/app/store/user/actions';
import { LoaderService } from './loader.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(
		private router: Router,
		private http: HttpClient,
		private store: Store<AppStateInterface>,
		private loader: LoaderService
	) {}
	userInfoApi = 'http://localhost:3004/auth/userinfo';
	loginApi = 'http://localhost:3004/auth/login';

	userLogin(userAuth: UserAuth) {
		this.loader.show();
		return this.http.post<{ token: string }>(this.loginApi, userAuth).pipe(
			map((data) => {
				localStorage.setItem('token', JSON.stringify(data.token));
				this.store.dispatch(
					UserActions.userAuth({
						token: data.token,
					})
				);
				return data.token;
			}),
			finalize(() => this.loader.hide())
		);
	}

	userAuth(token: string) {
		this.loader.show();
		return this.http.post<User>(this.userInfoApi, { token }).pipe(
			map((user) => {
				this.router.navigate([customPath.coursesList]);
				this.loader.hide();
				return user;
			}),
			finalize(() => this.loader.hide())
		);
	}

	userLogout() {
		this.loader.show();
		localStorage.clear();
		this.router.navigate([customPath.login]);
		this.loader.hide();
		return of(new User());
	}
}
