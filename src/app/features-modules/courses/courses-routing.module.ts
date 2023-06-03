import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isLoggedInGuard } from 'src/app/core/guards/isLoggedIn.guard';
import { CoursesResolver } from 'src/app/core/resolvers/courses.resolver';
import { CourseCompositionComponent } from './course-composition/course-composition.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CoursesComponent } from './courses.component';

const routes: Routes = [
	{
		path: '',
		component: CoursesComponent,
		data: { title: 'Courses' },
		canActivate: [isLoggedInGuard],
		children: [
			{
				path: 'courses',
				component: CourseListComponent,
				data: { title: 'Courses', shouldReuse: true },
			},
			{
				path: 'courses/new',
				component: CourseCompositionComponent,
				data: { title: 'New Course' },
			},
			{
				path: 'courses/:id',
				component: CourseCompositionComponent,
				data: { title: 'Edit Course' },
				resolve: { course: CoursesResolver },
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CoursesRoutingModule {}
