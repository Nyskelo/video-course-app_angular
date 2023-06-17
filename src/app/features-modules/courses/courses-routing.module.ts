import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isLoggedInGuard } from 'src/app/core/guards/isLoggedIn.guard';
import { CoursesResolver } from 'src/app/core/resolvers/courses.resolver';
import { customPath } from 'src/app/utils/global.model';
import { CourseCompositionComponent } from './course-composition/course-composition.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CoursesReactiveFormComponent } from './courses-reactive-form/courses-reactive-form.component';
import { CoursesComponent } from './courses.component';

const routes: Routes = [
	{
		path: '',
		component: CoursesComponent,
		data: { title: 'Courses' },
		canActivate: [isLoggedInGuard],
		children: [
			{
				path: customPath.coursesList,
				component: CourseListComponent,
				data: { title: 'Courses', shouldReuse: true },
			},
			{
				path: customPath.courseAdd,
				component: CoursesReactiveFormComponent,
				// component: CourseCompositionComponent,
				data: { title: 'New Course' },
			},
			{
				path: customPath.courseEdit,
				component: CoursesReactiveFormComponent,
				// component: CourseCompositionComponent,
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
