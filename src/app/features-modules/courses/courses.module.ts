import { NgModule } from '@angular/core';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseListComponent } from './course-list/course-list.component';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { CourseCompositionComponent } from './course-composition/course-composition.component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from 'src/app/features-modules/courses/cache-reuse-strategy.strategy';

@NgModule({
	declarations: [
		CoursesComponent,
		CourseListComponent,
		CourseCompositionComponent,
	],
	imports: [CoursesRoutingModule, SharedModule],
	exports: [CoursesComponent, CoursesRoutingModule],
	providers: [
		FilterPipe,
		{
			provide: RouteReuseStrategy,
			useClass: CustomRouteReuseStrategy,
		},
	],
})
export class CoursesModule {}
