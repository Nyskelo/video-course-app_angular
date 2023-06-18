import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { SharedModule } from 'src/app/shared/shared.module';
import { Store } from '@ngrx/store';
import * as UserActions from 'src/app/store/user/actions';
import { AppStateInterface } from 'src/app/store';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

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
		private store: Store<AppStateInterface>,
		private formBuilder: FormBuilder
	) {
		this.token = JSON.parse(localStorage.getItem('token') as string);
	}
	ngOnDestroy(): void {
		console.log('LOGIN - LoginComponent has been destroyed');
	}
	form = this.formBuilder.group({
		email: ['', [Validators.required]],
		password: ['', [Validators.required]],
	});
	get email() {
		return this.form.get('email') as FormControl;
	}
	get password() {
		return this.form.get('password') as FormControl;
	}
	onSubmit() {
		if (this.form.invalid) {
			alert('Please complete the fields below');
			return;
		}
		this.store.dispatch(
			UserActions.userLogin({
				auth: { login: this.email.value, password: this.password.value },
			})
		);
	}
}
