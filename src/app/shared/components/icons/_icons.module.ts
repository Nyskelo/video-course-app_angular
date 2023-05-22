import { NgModule } from '@angular/core';
import { ScheduleComponent } from './schedule.component';
import { CalendarComponent } from './calendar.component';
import { EditComponent } from './edit.component';
import { DeleteComponent } from './delete.component';
import { PlusComponent } from './plus.component';
import { OutputComponent } from './output.component';
import { PersonComponent } from './person.component';

@NgModule({
	imports: [],
	declarations: [
		ScheduleComponent,
		CalendarComponent,
		EditComponent,
		DeleteComponent,
		PlusComponent,
		OutputComponent,
		PersonComponent,
	],
	exports: [
		ScheduleComponent,
		CalendarComponent,
		EditComponent,
		DeleteComponent,
		PlusComponent,
		OutputComponent,
		PersonComponent,
	],
})
export class IconsModule {}
