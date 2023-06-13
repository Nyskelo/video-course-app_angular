import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import * as UserActions from 'src/app/store/user/actions';
import { AppStateInterface } from 'src/app/store';

@UntilDestroy({ checkProperties: true })
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	user!: string;
	constructor(
		private authService: AuthService,
		private store: Store<AppStateInterface>
	) {
		this.authService.currentUser$.subscribe((user) => {
			this.user = user.login;
		});
	}

	onLogout() {
		this.authService.logout();
		this.store.dispatch(UserActions.userLogout());
	}
}
