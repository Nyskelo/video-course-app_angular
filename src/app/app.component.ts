import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AuthService } from './core/services/auth.service';

@UntilDestroy({ checkProperties: true })
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'Video course';
	token = '';

	constructor(
		private router: Router,
		private titleService: Title,
		private activatedRoute: ActivatedRoute,
		private authService: AuthService
	) {
		this.token = JSON.parse(localStorage.getItem('token') as string);
	}

	ngOnInit() {
		this.token && this.authService.authorization(this.token);
		this.setTitle();
	}

	getChild(activatedRoute: ActivatedRoute): ActivatedRoute {
		if (activatedRoute.firstChild) {
			return this.getChild(activatedRoute.firstChild);
		} else {
			return activatedRoute;
		}
	}

	setTitle() {
		this.router.events.subscribe(() => {
			this.getChild(this.activatedRoute).data.subscribe(({ course, title }) => {
				if (course) {
					this.titleService.setTitle(course['name']);
				} else {
					this.titleService.setTitle(title);
				}
			});
		});
	}
}
