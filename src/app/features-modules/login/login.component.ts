import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@UntilDestroy({ checkProperties: true })
@Component({
	selector: 'app-login',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
	constructor(private authService: AuthService, private router: Router) {}

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
		this.router.navigate(['courses']);
	}
}
