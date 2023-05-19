import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseListComponent } from './course-list/course-list.component';

@NgModule({
	declarations: [CoursesComponent, CourseListComponent],
	imports: [CommonModule, CoursesRoutingModule, SharedModule],
	exports: [CoursesComponent],
})
export class CoursesModule {}
