import {
	ChangeDetectionStrategy,
	Component,
	inject,
	OnInit,
} from '@angular/core';
import { Course } from 'src/app/utils/global.model';
import { CoursesService } from './services/courses.service';

@Component({
	selector: 'app-courses',
	templateUrl: './courses.component.html',
	styleUrls: ['./courses.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit {
	coursesService: CoursesService = inject(CoursesService);
	courses: Course[] = [];
	searchText = '';

	ngOnInit(): void {
		this.courses = this.coursesService.getCourses();
		console.log(`Courses has been initilazed!`);
	}

	onSearchClick(searchValue: string) {
		this.searchText = searchValue;
		console.log(`Search value: ${this.searchText}`);
	}
	onDeleteCourseID(id: number) {
		console.log(`Course with id #${id} has been deleted`);
	}
	onLoadMore(): void {
		console.log('Loaded more was clicked!');
	}
}
