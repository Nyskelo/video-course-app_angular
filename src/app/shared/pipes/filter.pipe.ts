import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'filter',
})
export class FilterPipe implements PipeTransform {
	transform<T>(array: T[], filterString: T[keyof T], property: keyof T) {
		if (array) {
			const regex = new RegExp(String(filterString), 'gi');
			return array.filter((el) => String(el[property]).match(regex));
		} else {
			return array;
		}
	}
}
