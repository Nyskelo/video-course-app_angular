import {
	ChangeDetectionStrategy,
	Component,
	inject,
	OnInit,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { Course } from 'src/app/utils/global.model';
import { CoursesService } from './services/courses.service';

@Component({
	selector: 'app-courses',
	templateUrl: './courses.component.html',
	styleUrls: ['./courses.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit {
	constructor(private filteredPipe: FilterPipe) {}
	coursesService: CoursesService = inject(CoursesService);
	courses: Course[] = [];
	filteredCourses$!: Observable<Course[]>;
	searchText = '';

	ngOnInit(): void {
		this.courses = this.coursesService.getCourses();
		this.filteredCourses$ = of(this.courses);
		console.log(`Courses has been initilazed!`);
	}

	onSearchClick(searchValue: string) {
		this.searchText = searchValue;
		const updatedCourses = this.filteredPipe.transform(
			this.courses,
			searchValue,
			'name'
		);
		this.filteredCourses$ = of(updatedCourses);
		console.log(`Search value: ${this.searchText}`);
	}
	onDeleteCourseID(id: number) {
		console.log(`Course with id #${id} has been deleted`);
	}
	onLoadMore(): void {
		console.log('Loaded more was clicked!');
	}
}
