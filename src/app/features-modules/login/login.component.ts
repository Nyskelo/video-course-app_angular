import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
	constructor(private authService: AuthService) {}

	@Output() logEmail: EventEmitter<string> = new EventEmitter<string>();
	@Output() logPassword: EventEmitter<string> = new EventEmitter<string>();
	email = '';
	password = '';
	authData = {
		email: this.email,
		password: this.password,
		token: 'token',
	};

	onInputEmailValue(value: string) {
		this.logEmail.emit(value);
		this.email = value;
	}
	onInputPasswordValue(value: string) {
		this.logPassword.emit(value);
		this.password = value;
	}

	onSubmit() {
		if (!this.email && !this.password) {
			alert('Please complete the fields below');
			return;
		}

		const newUser = { firstName: 'Pretty', lastName: 'GoodDay', id: '111' };
		localStorage.setItem(`token`, JSON.stringify([newUser, this.authData]));

		this.logEmail.emit('');
		this.logPassword.emit('');

		this.authService.login(newUser);
	}
}
