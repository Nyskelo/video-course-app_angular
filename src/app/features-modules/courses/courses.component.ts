import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Course } from 'src/app/utils/global.model';

@Component({
	selector: 'app-courses',
	templateUrl: './courses.component.html',
	styleUrls: ['./courses.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit {
	courses: Course[] = [];
	ngOnInit(): void {
		this.courses = [
			{
				id: '165-3345-4444',
				title: 'Video courses 1. Name tag',
				creationDate: 'date',
				duration: 60,
				description:
					'Elit minim consequat quis aute labore deserunt magna tempor proident.Proident excepteur minim officia eu anim aliqua incididunt commodo qui consequat reprehenderit minim adipisicing consectetur.Cupidatat dolor magna velit minim ut eiusmod.loCupidatat aliquip aliquip irure aliqua dolor laborum Lorem dolor ad cupidatat aliquip tempor sint.',
			},
			{
				id: '244-5567-4432',
				title: 'Video courses 2. Name tag',
				creationDate: 'date',
				duration: 122,
				description:
					'Occaecat aute ex ex minim pariatur.Irure cillum et mollit dolore commodo exercitation anim et et tempor.Non enim quis nulla est non.loCupidatat aliquip aliquip irure aliqua dolor laborum Lorem dolor ad cupidatat aliquip tempor sint.',
			},
		];
		console.log(`Courses has been initilazed!`);
	}

	searchText = '';
	onSearchClick(searchValue: string) {
		this.searchText = searchValue;
		console.log(`Search value: ${this.searchText}`);
	}
	onDeleteCourseID(id: string) {
		console.log(`Course with id #${id} has been deleted`);
	}
	onLoadMore(): void {
		console.log('Loaded more was clicked!');
	}
}
