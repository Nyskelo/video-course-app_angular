import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CoursesResolver } from './resolvers/courses.resolver';
import { AuthService } from './services/auth.service';

@NgModule({
	declarations: [],
	imports: [SharedModule],
	exports: [SharedModule],
	providers: [AuthService, CoursesResolver],
})
export class CoreModule {}
