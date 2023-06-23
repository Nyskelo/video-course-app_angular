import { FormControl } from '@angular/forms';
import { storeTranslate } from 'src/app/core/components/header/header.component';
import { Author } from 'src/app/utils/global.model';

//Form validations methods
export function controlSpaces(min: number, max: number) {
	return (controls: FormControl) => {
		let removedSpaces = controls.value
			? controls.value.split('  ').join(' ')
			: controls.value;
		controls.value !== removedSpaces && controls.setValue(removedSpaces);

		if (controls.value && controls.value.trim().length < min) {
			removedSpaces = controls.value.replace(/^\s/g, '');
			controls.value !== removedSpaces && controls.setValue(removedSpaces);
			return { minLengthSpaces: true };
		}
		if (controls.value && controls.value.trim().length > max) {
			return { maxLengthSpaces: true };
		}

		return null;
	};
}

export function greaterThenZero(controls: FormControl) {
	const removedZeroStart = controls.value;
	controls.value !== removedZeroStart && controls.setValue(+removedZeroStart);
	const isValid = +controls.value >= 1 && !/^0/g.test(controls.value);
	const isInValidZero = /^0/g.test(controls.value) && controls.value.length > 1;
	const msg = isInValidZero
		? storeTranslate.instant('errors.greaterThenZero1')
		: storeTranslate.instant('errors.greaterThenZero2');
	return isValid
		? null
		: {
				customValidation: true,
				customValidationMsg: msg,
		  };
}

export function oneSpaceExpected(controls: FormControl) {
	const value = controls.value;
	controls.value !== value && controls.setValue(value);
	const NAME_REGEX = /^[a-z]+\s[a-z]+$/gi;
	const NAME_REGEX_Next = /^[a-z]+\s\s+$/gi;
	const NAME_REGEX_Digit = /\d+/g;
	const result = NAME_REGEX.test(controls.value);
	if (NAME_REGEX_Digit.test(controls.value)) {
		return {
			customValidation: true,
			customValidationMsg: storeTranslate.instant(
				'errors.errorNameAndLastnameExpected'
			),
		};
	}
	if (NAME_REGEX_Next.test(controls.value)) {
		return result || controls.value === null || controls.value === ''
			? null
			: {
					customFullNameRequiered: true,
					customValidationMsg: storeTranslate.instant(
						'errors.errorNameAndLastnameExpected'
					),
			  };
	}
	return null;
}

export function customRequiered(arrayOfAuthors: () => Author[]) {
	return (controls: FormControl) => {
		const value = controls.value;
		controls.value !== value && controls.setValue(value);
		return (arrayOfAuthors()?.length > 0 && !Array.isArray(controls.value)) ||
			(controls.value && !Array.isArray(controls.value)) ||
			arrayOfAuthors()?.length > 0
			? null
			: {
					customRequiered: true,
					customValidationMsg: storeTranslate.get(
						'errors.errorAuthorNameExpected'
					),
			  };
	};
}
