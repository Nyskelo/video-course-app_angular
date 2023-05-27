/* tslint:disable:no-unused-variable */

import { FilterPipe } from './filter.pipe';

describe('Pipe: Filtere', () => {
	const filterPipe = new FilterPipe();
	spyOn(filterPipe, 'transform').and.callThrough();
	const items = [{ name: 'Alla' }, { name: 'Maria' }, { name: 'Olena' }];

	it('create an instance', () => {
		expect(filterPipe).toBeTruthy();
	});
	it('should return empty array if no items given', () => {
		expect(filterPipe.transform(items, 'Alla', 'name')).toBe([
			{ name: 'Alla' },
		]);
	});
});
