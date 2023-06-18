/* tslint:disable:no-unused-variable */

import { FormControl } from '@angular/forms';
import { DateValidatorDirective } from './dateValidator.directive';

const dateCorrect = new FormControl();
const dateIncorrect = new FormControl();
dateCorrect.setValue('11/11/1111');
dateIncorrect.setValue('sssss');
describe('Directive: DateValidator', () => {
	it('should return null', () => {
		const directive = new DateValidatorDirective();
		directive.appDateValidator = { reg: /\d/g, format: 'string' };
		expect(directive.validate(dateCorrect)).not.toEqual({});
	});
	it('should return error', () => {
		const directive = new DateValidatorDirective();
		directive.appDateValidator = { reg: /\d+/g, format: 'string' };
		expect(directive.validate(dateIncorrect)).toEqual({
			customValidation: true,
			customValidationMsg: `Please provide correct date format - ${directive.appDateValidator.format}`,
		});
	});
});
