import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { storeTranslate } from 'src/app/core/components/header/header.component';
import { isLoggedInGuard } from 'src/app/core/guards/isLoggedIn.guard';
import { CoursesResolver } from 'src/app/core/resolvers/courses.resolver';
import { customPath } from 'src/app/utils/global.model';
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
				data: { shouldReuse: true },
				title: 'Courses',
			},
			{
				path: customPath.courseAdd,
				component: CoursesReactiveFormComponent,
				data: { title: 'New Course' },
				title: () => storeTranslate.instant('courses.course-new'),
			},
			{
				path: customPath.courseEdit,
				component: CoursesReactiveFormComponent,
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
