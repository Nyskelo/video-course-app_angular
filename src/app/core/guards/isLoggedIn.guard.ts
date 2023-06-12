import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
	providedIn: 'root',
})
export class isLoggedInGuard {
	constructor(private authService: AuthService, private router: Router) {}
	canActivate() {
		this.authService.isAuthenticated$.subscribe((res) => {
			if (!res) {
				this.router.navigate(['/login']);
				return false;
			}
			return true;
		});
	}
}
