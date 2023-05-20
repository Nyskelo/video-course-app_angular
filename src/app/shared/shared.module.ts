import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { IconsModule } from './components/icons/_icons.module';

@NgModule({
	declarations: [InputComponent, ButtonComponent],
	imports: [CommonModule, IconsModule],
	exports: [InputComponent, ButtonComponent, IconsModule, CommonModule],
})
export class SharedModule {}
