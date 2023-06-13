import {
	ChangeDetectionStrategy,
	Component,
	computed,
	OnDestroy,
	signal,
} from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { Store } from '@ngrx/store';
import * as UserActions from 'src/app/store/user/actions';
import { AppStateInterface } from 'src/app/store';

@UntilDestroy({ checkProperties: true })
@Component({
	selector: 'app-login',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
	token = '';
	constructor(
		private authService: AuthService,
		private router: Router,
		private store: Store<AppStateInterface>
	) {
		this.token = JSON.parse(localStorage.getItem('token') as string);
	}
	ngOnDestroy(): void {
		console.log('LOGIN - LoginComponent has been destroyed');
	}

	email = signal('');
	password = signal('');
	authData = computed(() => {
		return {
			login: this.email(),
			password: this.password(),
		};
	});

	onInputEmailValue(value: string) {
		this.email.set(value);
	}
	onInputPasswordValue(value: string) {
		this.password.set(value);
	}

	onSubmit() {
		if (!this.email().trim() || !this.password().trim()) {
			alert('Please complete the fields below');
			return;
		}
		this.store.dispatch(
			UserActions.userLogin({
				auth: this.authData(),
			})
		);

		this.authService.login(this.authData());
	}
}
