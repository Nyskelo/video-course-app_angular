import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './features-modules/page-not-found/page-not-found.component';
import { customPath } from './utils/global.model';

const routes: Routes = [
	{
		path: '',
		loadChildren: async () =>
			await (
				await import('./features-modules/courses/courses-routing.module')
			).CoursesRoutingModule,
	},
	{
		path: customPath.login,
		loadComponent: async () =>
			await (
				await import('./features-modules/login/login.component')
			).LoginComponent,
	},
	{ path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
