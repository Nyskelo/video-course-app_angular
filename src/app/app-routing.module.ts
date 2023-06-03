import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isLoggedInGuard } from './core/guards/isLoggedIn.guard';
import { CoursesResolver } from './core/resolvers/courses.resolver';
import { CourseCompositionComponent } from './features-modules/courses/course-composition/course-composition.component';
import { CoursesComponent } from './features-modules/courses/courses.component';

const routes: Routes = [
	{
		path: 'login',
		loadComponent: async () =>
			await (
				await import('./features-modules/login/login.component')
			).LoginComponent,
	},
	{
		path: '',
		redirectTo: 'courses',
		pathMatch: 'full',
	},
	{
		path: 'courses',
		component: CoursesComponent,
		data: { title: 'Courses' },
		canActivate: [isLoggedInGuard],
		children: [
			{
				path: 'new',
				component: CourseCompositionComponent,
				data: { title: 'New Course' },
			},
			{
				path: ':id',
				component: CourseCompositionComponent,
				data: { title: 'Edit Course' },
				resolve: { course: CoursesResolver },
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
