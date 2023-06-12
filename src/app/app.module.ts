import { HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { LoaderComponent } from './core/components/loader/loader.component';
import { LogoComponent } from './core/components/logo/logo.component';
import { CoreModule } from './core/core.module';
import { FeaturesModulesModule } from './features-modules/features-modules.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		LogoComponent,
		LoaderComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		CoreModule,
		FeaturesModulesModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MatProgressSpinnerModule,
		EffectsModule.forRoot([]),
		StoreModule.forRoot({}),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
