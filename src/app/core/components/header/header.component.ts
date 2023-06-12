import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	user!: string;
	constructor(private authService: AuthService) {
		this.authService.currentUser$.subscribe((user) => {
			this.user = user.login;
		});
	}

	onLogout() {
		this.authService.logout();
	}
}
