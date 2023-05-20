import { NgModule } from '@angular/core';
import { ScheduleComponent } from './schedule.component';
import { CalendarComponent } from './calendar.component';
import { EditComponent } from './edit.component';
import { DeleteComponent } from './delete.component';
import { PlusComponent } from './plus.component';

@NgModule({
	imports: [],
	declarations: [
		ScheduleComponent,
		CalendarComponent,
		EditComponent,
		DeleteComponent,
		PlusComponent,
	],
	exports: [
		ScheduleComponent,
		CalendarComponent,
		EditComponent,
		DeleteComponent,
		PlusComponent,
	],
})
export class IconsModule {}
