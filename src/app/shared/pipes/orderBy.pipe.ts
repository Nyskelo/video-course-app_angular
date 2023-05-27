import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
	transform<T>(value: T, field: string, order?: 'desc' | 'asc') {
		if (!Array.isArray(value)) {
			return;
		}
		if (field === 'date') {
			return value.sort((a, b) => {
				if (order === 'asc') {
					return new Date(a.date).getTime() - new Date(b.date).getTime();
				}
				if (order === 'desc') {
					return new Date(b.date).getTime() - new Date(a.date).getTime();
				} else {
					return 0;
				}
			});
		}
		return value.sort(() => {
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
