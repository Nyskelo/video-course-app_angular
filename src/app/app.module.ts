import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FeaturesModulesModule } from './features-modules/features-modules.module';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, CoreModule, FeaturesModulesModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
