/* tslint:disable:no-unused-variable */

import { FilterPipe } from './filter.pipe';

describe('Pipe: Filtere', () => {
	const filterPipe = new FilterPipe();
	const items = [{ name: 'Alla' }, { name: 'Maria' }, { name: 'Olena' }];
	beforeEach(() => spyOn(filterPipe, 'transform').and.callThrough());

	it('should return [{ name: "Alla" }] from item array', () => {
		expect(filterPipe.transform(items, 'Alla', 'name')).toEqual([
			{ name: 'Alla' },
		]);
	});
});
