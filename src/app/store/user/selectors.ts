import { createSelector } from '@ngrx/store';
import { AppStateInterface } from '..';

export const selectFeature = (state: AppStateInterface) => state.user;

export const isLoadingSelector = createSelector(
	selectFeature,
	(state) => state.isLoading
);

export const isLoggedInSelector = createSelector(
	selectFeature,
	(state) => state.isLoggedIn
);

export const userSelector = createSelector(
	selectFeature,
	(state) => state.user
);

export const errorSelector = createSelector(
	selectFeature,
	(state) => state.error
);
