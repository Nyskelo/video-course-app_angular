import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import * as UserActions from 'src/app/store/user/actions';
import { AppStateInterface } from 'src/app/store';
import { Observable } from 'rxjs';
import {
	isLoggedInSelector,
	userNameSelector,
} from 'src/app/store/user/selectors';

@UntilDestroy({ checkProperties: true })
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	userName$!: Observable<string>;
	isGoggedIn$!: Observable<boolean>;
	constructor(private store: Store<AppStateInterface>) {
		this.userName$ = this.store.pipe(select(userNameSelector));
		this.isGoggedIn$ = this.store.pipe(select(isLoggedInSelector));
	}

	onLogout() {
		this.store.dispatch(UserActions.userLogout());
	}
}
