import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

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
		return this.authService.getUserInfo().firstName;
	}
}
