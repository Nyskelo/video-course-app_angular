import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/auth/login/login.component';

@NgModule({
	declarations: [
		HeaderComponent,
		FooterComponent,
		LogoComponent,
		NavbarComponent,
		PageNotFoundComponent,
		LoginComponent,
	],
	exports: [HeaderComponent, FooterComponent, LogoComponent, NavbarComponent],
	imports: [CommonModule],
})
export class CoreModule {}
