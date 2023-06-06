import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { LogoComponent } from './core/components/logo/logo.component';
import { CoreModule } from './core/core.module';
import { FeaturesModulesModule } from './features-modules/features-modules.module';

@NgModule({
	declarations: [AppComponent, HeaderComponent, FooterComponent, LogoComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		CoreModule,
		FeaturesModulesModule,
		HttpClientModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
