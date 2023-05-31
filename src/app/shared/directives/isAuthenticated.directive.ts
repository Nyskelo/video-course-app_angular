import {
	Directive,
	Input,
	OnInit,
	TemplateRef,
	ViewContainerRef,
} from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Directive({
	selector: '[appIsAuthenticated]',
})
export class IsAuthenticatedDirective implements OnInit {
	constructor(
		private templateRef: TemplateRef<HTMLElement>,
		private authService: AuthService,
		private viewContainer: ViewContainerRef
	) {}
	condition = false;

	@Input() set appIsAuthenticated(condition: boolean) {
		this.condition = condition;
	}
	ngOnInit() {
		this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
			if (
				(isAuthenticated && this.condition) ||
				(!isAuthenticated && !this.condition)
			) {
				this.viewContainer.createEmbeddedView(this.templateRef);
			} else {
				this.viewContainer.clear();
			}
		});
	}
}
