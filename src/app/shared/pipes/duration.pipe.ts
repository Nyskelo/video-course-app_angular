import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'duration',
})
export class DurationPipe implements PipeTransform {
	transform(value: number): string {
		const HOUR = 60;
		const hours = `${Math.floor(value / HOUR)}h`;
		const min = `${Math.floor(value % HOUR)}min`;
		return value > HOUR - 1 ? `${hours} ${min}` : min;
	}
}
