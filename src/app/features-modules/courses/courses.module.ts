import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseListComponent } from './course-list/course-list.component';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { CourseCompositionComponent } from './course-composition/course-composition.component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from 'src/app/features-modules/courses/cache-reuse-strategy.strategy';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from './store/effects';

@NgModule({
	declarations: [
		CoursesComponent,
		CourseListComponent,
		CourseCompositionComponent,
	],
	imports: [
		CoursesRoutingModule,
		SharedModule,
		StoreModule.forFeature('courses', reducers),
		EffectsModule.forFeature([CoursesEffects]),
	],
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
