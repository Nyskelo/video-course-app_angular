import { AuthService } from './auth.service';
import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthTokenInterceptorService implements HttpInterceptor {
	constructor(private authService: AuthService) {}
	intercept<T>(
		req: HttpRequest<T>,
		next: HttpHandler
	): Observable<HttpEvent<T>> {
		const user = this.authService.getUserInfo();
		if (!user) {
			return next.handle(req);
		}
		const modifiedReq = req.clone({
			params: req.params.append('auth', user.fakeToken),
		});
		return next.handle(modifiedReq);
	}
}
