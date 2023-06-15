import { CoursesStateInterface } from './courses/reducers';
import { UserStateInterface } from './user/reducers';

export interface AppStateInterface {
	courses: CoursesStateInterface;
	user: UserStateInterface;
}
