import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { customPath, User, UserAuth } from 'src/app/utils/global.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/store';
import * as UserActions from 'src/app/store/user/actions';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor(
		private router: Router,
		private http: HttpClient,
		private store: Store<AppStateInterface>
	) {}
	userInfoApi = 'http://localhost:3004/auth/userinfo';
	loginApi = 'http://localhost:3004/auth/login';

	userLogin(userAuth: UserAuth) {
		return this.http.post<{ token: string }>(this.loginApi, userAuth).pipe(
			map((data) => {
				localStorage.setItem('token', JSON.stringify(data.token));
				this.store.dispatch(
					UserActions.userAuth({
						token: data.token,
					})
				);
				return data.token;
			})
		);
	}

	userAuth(token: string) {
		return this.http.post<User>(this.userInfoApi, { token }).pipe(
			map((user) => {
				this.router.navigate([customPath.coursesList]);

				return user;
			})
		);
	}

	userLogout() {
		localStorage.clear();
		this.router.navigate([customPath.login]);

		return of(new User());
	}
}
