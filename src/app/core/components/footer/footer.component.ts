import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-footer',
	template: ` <footer>
		<span>Copyright {{ '&copy;' }} Videocourses. All rights reserved</span>
	</footer>`,
	styleUrls: ['./footer.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
