import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-logo',
	template:
		'<img src="../../../../assets/img/video-course-logo.png" alt="logo" />',
	styles: ['img{width: 100%;}'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {}
