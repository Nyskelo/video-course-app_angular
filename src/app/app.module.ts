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
import { coursesReducers } from './store/courses/reducers';
import { userReducers } from './store/user/reducers';
import { CoursesEffects } from './store/courses/effects';
import { UserEffects } from './store/user/effects';
import { authorsReducers } from './store/authors/reducers';
import { AuthorsEffects } from './store/authors/effects';

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
		EffectsModule.forRoot([CoursesEffects, UserEffects, AuthorsEffects]),
		StoreModule.forRoot({
			courses: coursesReducers,
			user: userReducers,
			authors: authorsReducers,
		}),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
