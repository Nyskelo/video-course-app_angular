import { CoursesStateInterface } from './courses/reducers';
import { UserStateInterface } from './user/reducers';
import { AuthorsStateInterface } from './authors/reducers';

export interface AppStateInterface {
	courses: CoursesStateInterface;
	user: UserStateInterface;
	authors: AuthorsStateInterface;
}
