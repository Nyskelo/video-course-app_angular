/* tslint:disable:no-unused-variable */
import { OrderByPipe } from './orderBy.pipe';

describe('Pipe: OrderBye', () => {
	const pipe = new OrderByPipe();
	const mockArrayAsc = [
		{ date: '2016-05-31T02:02:36+00:00' },
		{ date: '2017-09-28T04:39:24+00:00' },
	];
	const mockArrayDesc = [
		{ date: '2017-09-28T04:39:24+00:00' },
		{ date: '2016-05-31T02:02:36+00:00' },
	];

	it('create an instance', () => {
		expect(pipe).toBeTruthy();
	});
	it('transforms "mockArrayDesc" to "mockArrayAsc"', () => {
		expect(pipe.transform(mockArrayDesc, 'date', 'asc')?.values).toBe(
			mockArrayAsc.values
		);
	});

	it('transforms "mockArrayAsc" to "mockArrayDesc"', () => {
		expect(pipe.transform(mockArrayAsc, 'date', 'desc')?.values).toBe(
			mockArrayDesc.values
		);
	});

	it('transforms "mockArrayAsc" to "mockArrayAssc"', () => {
		expect(pipe.transform(mockArrayAsc, 'date')?.values).toBe(
			mockArrayAsc.values
		);
	});
});
