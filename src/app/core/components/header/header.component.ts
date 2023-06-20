import { Component, signal } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import * as UserActions from 'src/app/store/user/actions';
import { AppStateInterface } from 'src/app/store';
import { Observable } from 'rxjs';
import { isLoggedInSelector, userSelector } from 'src/app/store/user/selectors';
import { TranslateService } from '@ngx-translate/core';

export let storeTranslate: TranslateService;
@UntilDestroy({ checkProperties: true })
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	userName = signal<string>('');
	isGoggedIn$!: Observable<boolean>;
	constructor(
		private store: Store<AppStateInterface>,
		public translate: TranslateService
	) {
		this.store
			.pipe(select(userSelector))
			.subscribe((user) => this.userName.set(user.login));
		this.isGoggedIn$ = this.store.pipe(select(isLoggedInSelector));

		translate.addLangs(['en', 'uk']);
		translate.setDefaultLang('en');
		const browserLang = translate.getBrowserLang();
		translate.use(browserLang?.match(/en|uk/) ? browserLang : 'en');
		storeTranslate = translate;
	}
	onLogout() {
		this.store.dispatch(UserActions.userLogout());
	}
}
