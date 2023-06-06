import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { customPath } from 'src/app/utils/global.model';

@Component({
	selector: 'app-page-not-found',
	templateUrl: './page-not-found.component.html',
	styleUrls: ['./page-not-found.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {
	constructor(private router: Router) {}
	onClick() {
		this.router.navigate([customPath.coursesList]);
	}
}
