import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseCardComponent } from './ui/course-card/course-card.component';
import { CourseAddComponent } from './feature-pages/course-add/course-add.component';
import { CourseEditComponent } from './feature-pages/course-edit/course-edit.component';
import { CourseDeleteComponent } from './feature-pages/course-delete/course-delete.component';
import { CoursesComponent } from './courses.component';
import { CourseListComponent } from './feature-pages/course-list/course-list.component';

@NgModule({
	declarations: [
		CourseCardComponent,
		CourseAddComponent,
		CourseEditComponent,
		CourseDeleteComponent,
		CourseListComponent,
		CoursesComponent,
	],
	imports: [CommonModule],
	exports: [CoursesComponent],
})
export class CoursesModule {}
