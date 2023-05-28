/* tslint:disable:no-unused-variable */

import { DurationPipe } from './duration.pipe';

describe('PipeDuratione shoude transfom number value to duration format "hh h mm min" or "mm min":', () => {
	describe('if value is a number:', () => {
		it('shoude transform 125 to "2h 5min"', () => {
			const pipe = new DurationPipe();
			expect(pipe.transform(125)).toEqual('2h 5min');
		});
		it('shoude transform 59 to "5min" without hours if duration smaller then 1hour:', () => {
			const pipe = new DurationPipe();
			expect(pipe.transform(59)).toEqual('59min');
		});
	});
	describe('if value not valid:', () => {
		it('shoude do nothing:', () => {
			const pipe = new DurationPipe();
			expect(pipe.transform(0)).toBeUndefined();
		});
	});
});
