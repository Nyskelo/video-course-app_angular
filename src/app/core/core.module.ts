import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CoursesResolver } from './resolvers/courses.resolver';
import { AuthTokenInterceptorService } from './services/auth-token-interceptor.service';
import { AuthService } from './services/auth.service';
// import { LoaderInterceptor } from './services/loader-intersceptor.service';
import { LoaderService } from './services/loader.service';

@NgModule({
	declarations: [],
	imports: [SharedModule],
	exports: [SharedModule],
	providers: [
		AuthService,
		CoursesResolver,
		LoaderService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthTokenInterceptorService,
			multi: true,
		},
		// {
		// 	provide: HTTP_INTERCEPTORS,
		// 	useClass: LoaderInterceptor,
		// 	multi: true,
		// },
	],
})
export class CoreModule {}
