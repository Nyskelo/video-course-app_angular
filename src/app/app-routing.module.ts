import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: async () =>
			await (
				await import('./features-modules/courses/courses-routing.module')
			).CoursesRoutingModule,
	},
	{
		path: 'login',
		loadComponent: async () =>
			await (
				await import('./features-modules/login/login.component')
			).LoginComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
