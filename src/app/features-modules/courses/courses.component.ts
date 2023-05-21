import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Course } from 'src/app/utils/global.model';

@Component({
	selector: 'app-courses',
	templateUrl: './courses.component.html',
	styleUrls: ['./courses.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent {
	courses: Course[] = [
		{
			id: '1',
			title: 'titl1',
			creationDate: 'date',
			duration: 122,
			description: 'lorem',
		},
		{
			id: '2',
			title: 'titl2',
			creationDate: 'date',
			duration: 122,
			description: 'lorem',
		},
	];
	searchText = '';
	onSearchTextEntered(searchValue: string) {
		this.searchText = searchValue;
		console.log(`Search value: ${this.searchText}`);
	}
	onLoadMore(): void {
		console.log('Loaded more was clicked!');
	}
}
