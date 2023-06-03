import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesModule } from './courses/courses.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [PageNotFoundComponent],
	imports: [CommonModule, CoursesModule, SharedModule],
	exports: [CoursesModule, PageNotFoundComponent],
})
export class FeaturesModulesModule {}
