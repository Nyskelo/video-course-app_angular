import { createSelector } from '@ngrx/store';
import { CoursesStateInterface } from 'src/app/features-modules/courses/store/reducers';

export interface AppStateInterface {
	courses: CoursesStateInterface;
}

export const selectFeature = (state: AppStateInterface) => state.courses;

export const isLoadingSelector = createSelector(
	selectFeature,
	(state) => state.isLoading
);

export const coursesSelector = createSelector(
	selectFeature,
	(state) => state.courses
);

export const errorSelector = createSelector(
	selectFeature,
	(state) => state.error
);
