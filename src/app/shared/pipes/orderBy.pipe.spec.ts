/* tslint:disable:no-unused-variable */
import { OrderByPipe } from './orderBy.pipe';

describe('Pipe: OrderBye', () => {
	const pipe = new OrderByPipe();
	const mockArrayAsc = [
		{ date: '2016-05-31T02:02:36+00:00', id: '111' },
		{ date: '2017-09-28T04:39:24+00:00', id: '222' },
	];
	const mockArrayDesc = [
		{ date: '2017-09-28T04:39:24+00:00', id: '222' },
		{ date: '2016-05-31T02:02:36+00:00', id: '111' },
	];

	describe('should sort by sorting type in the correct date format:', () => {
		it('transforms "mockArrayDesc" to "mockArrayAsc" if sort type is ascif sort type is asc', () => {
			expect(pipe.transform(mockArrayDesc, 'date', 'asc')?.values).toBe(
				mockArrayAsc.values
			);
		});

		it('transforms "mockArrayAsc" to "mockArrayDesc" if sort type is desc', () => {
			expect(pipe.transform(mockArrayAsc, 'date', 'desc')?.values).toBe(
				mockArrayDesc.values
			);
		});

		it('transforms "mockArrayAsc" to "mockArrayAssc" if sort type is not provide', () => {
			expect(pipe.transform(mockArrayAsc, 'date')?.values).toBe(
				mockArrayAsc.values
			);
		});
	});

	describe('should sort by sorting type:', () => {
		it('transforms "mockArrayDesc" to "mockArrayAsc" if sort type is asc', () => {
			expect(pipe.transform(mockArrayDesc, 'id', 'asc')?.values).toBe(
				mockArrayAsc.values
			);
		});

		it('transforms "mockArrayAsc" to "mockArrayDesc"  if sort type is desc', () => {
			expect(pipe.transform(mockArrayAsc, 'id', 'desc')?.values).toBe(
				mockArrayDesc.values
			);
		});

		it('transforms "mockArrayAsc" to "mockArrayAsc" if sort type is not provide', () => {
			expect(pipe.transform(mockArrayAsc, 'id')?.values).toBe(
				mockArrayAsc.values
			);
		});
	});
});
