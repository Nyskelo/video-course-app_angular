import { createSelector } from '@ngrx/store';
import { AppStateInterface } from '..';

export const selectFeature = (state: AppStateInterface) => state.authors;

export const isLoadingSelector = createSelector(
	selectFeature,
	(state) => state.isLoading
);

export const authorsSelector = createSelector(
	selectFeature,
	(state) => state.authors
);

export const errorSelector = createSelector(
	selectFeature,
	(state) => state.error
);
