import {
	Directive,
	Input,
	OnInit,
	TemplateRef,
	ViewContainerRef,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/store';
import { isLoggedInSelector } from 'src/app/store/user/selectors';

@Directive({
	selector: '[appIsAuthenticated]',
})
export class IsAuthenticatedDirective implements OnInit {
	isAuthenticated$!: Observable<boolean>;
	constructor(
		private templateRef: TemplateRef<HTMLElement>,
		private store: Store<AppStateInterface>,
		private viewContainer: ViewContainerRef
	) {
		this.isAuthenticated$ = this.store.pipe(select(isLoggedInSelector));
	}
	condition = false;

	@Input() set appIsAuthenticated(condition: boolean) {
		this.condition = condition;
	}
	ngOnInit() {
		this.isAuthenticated$.subscribe((isAuthenticated) => {
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
