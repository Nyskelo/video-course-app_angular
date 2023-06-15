import { Component, signal } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import * as UserActions from 'src/app/store/user/actions';
import { AppStateInterface } from 'src/app/store';
import { Observable } from 'rxjs';
import { isLoggedInSelector, userSelector } from 'src/app/store/user/selectors';

@UntilDestroy({ checkProperties: true })
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	userName = signal<string>('');
	isGoggedIn$!: Observable<boolean>;
	constructor(private store: Store<AppStateInterface>) {
		this.store
			.pipe(select(userSelector))
			.subscribe((user) => this.userName.set(user.login));
		this.isGoggedIn$ = this.store.pipe(select(isLoggedInSelector));
	}

	onLogout() {
		this.store.dispatch(UserActions.userLogout());
	}
}
