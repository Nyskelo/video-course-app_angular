/* tslint:disable:no-unused-variable */
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/core/services/auth.service';
import { IsAuthenticatedDirective } from './isAuthenticated.directive';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppStateInterface } from 'src/app/store';
import { isLoggedInSelector } from 'src/app/store/user/selectors';

let store$: MockStore<AppStateInterface>;

let templateRef: jasmine.SpyObj<TemplateRef<HTMLElement>>;
let vcRef: ViewContainerRef;
let directive: IsAuthenticatedDirective;

describe('Directive: IsAuthenticated', () => {
	beforeEach(() => {
		const viewContainerRefSpy = jasmine.createSpyObj('ViewContainerRef', [
			'createEmbeddedView',
			'clear',
		]);

		TestBed.configureTestingModule({
			providers: [
				TemplateRef,
				AuthService,
				{ provide: ViewContainerRef, useValue: viewContainerRefSpy },
				provideMockStore({
					initialState: {
						user: {
							user: [],
							isLoggedIn: true,
						},
					},
				}),
			],
		}).compileComponents();
		store$ = TestBed.inject(MockStore);
		vcRef = TestBed.inject(ViewContainerRef);
		directive = new IsAuthenticatedDirective(templateRef, store$, vcRef);
	});
	describe('ngOnInit', () => {
		it('should return auth true', () => {
			store$.overrideSelector(isLoggedInSelector, true);
			store$.refreshState();
			directive.condition = true;
			directive.ngOnInit();
			directive.isAuthenticated$.subscribe((bool) => {
				expect(bool).toEqual(true);
			});
		});
		it('should clear ViewContainer if auth false', () => {
			const mockSelector = store$.overrideSelector(isLoggedInSelector, true);
			mockSelector.setResult(false);
			store$.refreshState();
			directive.condition = true;
			directive.ngOnInit();
			directive.isAuthenticated$.subscribe((bool) => {
				expect(bool).toEqual(false);
			});
		});
	});
	describe('appIsAuthenticated', () => {
		it('should be assigned a passed @Input value', () => {
			spyOnProperty(directive, 'appIsAuthenticated', 'set').and.callThrough();
			directive.appIsAuthenticated = true;
			directive.ngOnInit();
			expect(directive.condition).toBeTruthy();
		});
	});
});
