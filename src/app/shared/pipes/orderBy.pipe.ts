import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
	transform(value: any, field: any, order?: 'desc' | 'asc') {
		if (!Array.isArray(value)) {
			return;
		}
		return value.sort((a: any, b: any) => {
			if (order === 'asc') {
				return -1;
			}
			if (order === 'desc') {
				return 1;
			} else {
				return 0;
			}
		});
	}
}
