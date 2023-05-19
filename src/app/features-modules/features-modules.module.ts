import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [LoginComponent, PageNotFoundComponent],
	imports: [CommonModule, HomeModule, SharedModule],
	exports: [HomeModule, LoginComponent, PageNotFoundComponent],
})
export class FeaturesModulesModule {}
