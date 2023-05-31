import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
	constructor(private authService: AuthService) {}

	email = '';
	password = '';
	authData = {
		email: this.email,
		password: this.password,
		token: 'token',
	};

	onInputEmailValue(value: string) {
		this.email = value;
	}
	onInputPasswordValue(value: string) {
		this.password = value;
	}

	onSubmit() {
		if (!this.email.trim() && !this.password.trim()) {
			alert('Please complete the fields below');
			return;
		}

		const newUser = { firstName: 'Pretty', lastName: 'GoodDay', id: '111' };
		localStorage.setItem(`token`, JSON.stringify([newUser, this.authData]));

		this.authService.login(newUser);
	}
}
