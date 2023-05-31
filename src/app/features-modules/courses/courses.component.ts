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
	}

	onSearchClick(searchValue: string) {
		this.searchText = searchValue;
		this.onUpdateCourse(searchValue);
	}
	onDeleteCourseID(id: number) {
		this.coursesService.removeCourseByID(id);
		this.courses = this.courses.filter((course) => course.id !== id);
		this.onUpdateCourse(this.searchText);
	}
	onLoadMore(): void {
		console.log('Loaded more was clicked!');
	}
	onUpdateCourse(searchValue: string) {
		const updatedCourses = this.filteredPipe.transform(
			this.courses,
			searchValue,
			'name'
		);
		this.filteredCourses$ = of(updatedCourses);
	}
}
