import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseListComponent } from './course-list/course-list.component';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { CourseCompositionComponent } from './course-composition/course-composition.component';

@NgModule({
	declarations: [
		CoursesComponent,
		CourseListComponent,
		CourseCompositionComponent,
	],
	imports: [CommonModule, CoursesRoutingModule, SharedModule],
	exports: [CoursesComponent, CoursesRoutingModule],
	providers: [FilterPipe],
})
export class CoursesModule {}
