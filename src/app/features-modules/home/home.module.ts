import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseListComponent } from './course-list/course-list.component';

@NgModule({
	declarations: [HomeComponent, CourseListComponent],
	imports: [CommonModule, HomeRoutingModule, SharedModule],
	exports: [HomeComponent],
})
export class HomeModule {}
