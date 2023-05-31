/* tslint:disable:no-unused-variable */
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/core/services/auth.service';
import { IsAuthenticatedDirective } from './isAuthenticated.directive';

let service: AuthService;
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
			],
		}).compileComponents();

		service = new AuthService();
		spyOn(service, 'isAuthenticated').and.callThrough();
		vcRef = TestBed.inject(ViewContainerRef);
		directive = new IsAuthenticatedDirective(templateRef, service, vcRef);
	});
	describe('ngOnInit', () => {
		it('should show viewContainerRef if both boolean values are true', () => {
			service.authenticat = true;
			directive.condition = true;
			directive.ngOnInit();
			service.isAuthenticated$.subscribe(() => {
				expect(service.isAuthenticated()).toBeTruthy();
			});
		});
		it('should be cleared viewContainerRef if boolean values are different', () => {
			service.authenticat = false;
			directive.condition = true;
			directive.ngOnInit();
			service.isAuthenticated$.subscribe(() => {
				expect(service.isAuthenticated()).toBeFalsy();
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
