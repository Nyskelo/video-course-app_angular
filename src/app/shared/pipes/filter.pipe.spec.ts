/* tslint:disable:no-unused-variable */

import { FilterPipe } from './filter.pipe';

describe('Pipe: Filtere', () => {
	const filterPipe = new FilterPipe();
	const items = [{ name: 'Alla' }, { name: 'Maria' }, { name: 'Olena' }];
	beforeEach(() => spyOn(filterPipe, 'transform').and.callThrough());

	it('create an instance', () => {
		expect(filterPipe).toBeTruthy();
	});
	it('should return empty array if no items given', () => {
		expect(filterPipe.transform(items, 'Alla', 'name')).toEqual([
			{ name: 'Alla' },
		]);
		expect(filterPipe.transform).toHaveBeenCalled();
	});
});
