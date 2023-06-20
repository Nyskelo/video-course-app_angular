import { FormControl } from '@angular/forms';
import { controlSpaces } from './form-validations.helpers';

describe('controlSpaces', () => {
	let control: FormControl;
	it('valid', () => {
		control = new FormControl(['qq', [controlSpaces(5, 20)]]);
		control.setValue('phone number');
		expect(control.valid).toBeTruthy();
	});
	it('InValid', () => {
		control = new FormControl(['', [controlSpaces(2, 2)]]);
		control.setValue('e');
		expect(control.invalid).toBeFalsy();
	});
});
