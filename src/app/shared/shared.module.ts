import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { IconsModule } from './components/icons/_icons.module';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { FormsModule } from '@angular/forms';
import { DurationPipe } from './pipes/duration.pipe';
import { OrderByPipe } from './pipes/orderBy.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { BorderByDateDirective } from './directives/borderByDate.directive';
import { StarDirective } from './directives/star.directive';

@NgModule({
	declarations: [
		InputComponent,
		ButtonComponent,
		SearchbarComponent,
		DurationPipe,
		OrderByPipe,
		FilterPipe,
		BorderByDateDirective,
		StarDirective,
	],
	imports: [CommonModule, FormsModule, IconsModule],
	exports: [
		CommonModule,
		FormsModule,
		InputComponent,
		ButtonComponent,
		IconsModule,
		SearchbarComponent,
		DurationPipe,
		OrderByPipe,
		FilterPipe,
		BorderByDateDirective,
		StarDirective,
	],
})
export class SharedModule {}
