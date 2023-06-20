import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'duration',
})
export class DurationPipe implements PipeTransform {
	transform(
		value: number,
		params: { h: string; min: string }
	): string | undefined | null {
		if (!value) {
			return;
		}
		const HOUR = 60;
		const hours = `${Math.floor(value / HOUR)}` + params.h;
		const min = `${Math.floor(value % HOUR)}` + params.min;
		return value > HOUR - 1 ? `${hours} ${min}` : min;
	}
}
