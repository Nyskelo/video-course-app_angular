import {
	ChangeDetectionStrategy,
	Component,
	computed,
	signal,
} from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { customPath } from 'src/app/utils/global.model';

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
		if (!this.email().trim() && !this.password().trim()) {
			alert('Please complete the fields below');
			return;
		}

		this.authService.login(this.authData());
	}
}
