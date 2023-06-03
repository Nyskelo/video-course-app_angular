import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isLoggedInGuard } from './core/guards/isLoggedIn.guard';
import { CourseCompositionComponent } from './features-modules/courses/course-composition/course-composition.component';
import { CoursesComponent } from './features-modules/courses/courses.component';
import { LoginComponent } from './features-modules/login/login.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'courses',
		pathMatch: 'full',
	},
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'courses',
		component: CoursesComponent,
		canActivate: [isLoggedInGuard],
		children: [
			{
				path: 'new',
				component: CourseCompositionComponent,
			},
			{
				path: 'id',
				component: CourseCompositionComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
