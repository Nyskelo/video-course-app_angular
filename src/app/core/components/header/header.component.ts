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
	constructor(private authService: AuthService) {}

	onLogout() {
		this.authService.logout();
	}

	get userName() {
		return (
			JSON.parse(localStorage.getItem('token') as string)[0].firstName ||
			this.authService.getUserInfo().firstName
		);
	}
}
