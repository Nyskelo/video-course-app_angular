import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@NgModule({
	declarations: [],
	imports: [SharedModule],
	exports: [SharedModule],
	providers: [AuthService, UserService],
})
export class CoreModule {}
