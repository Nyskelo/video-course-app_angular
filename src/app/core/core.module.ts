import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CoursesResolver } from './resolvers/courses.resolver';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@NgModule({
	declarations: [],
	imports: [SharedModule],
	exports: [SharedModule],
	providers: [AuthService, UserService, CoursesResolver],
})
export class CoreModule {}
