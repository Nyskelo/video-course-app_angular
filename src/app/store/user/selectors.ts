import { createSelector } from '@ngrx/store';
import { AppStateInterface } from '..';

export const selectFeature = (state: AppStateInterface) => state.user;

export const isLoggedInSelector = createSelector(
	selectFeature,
	(state) => state.isLoggedIn
);

export const userSelector = createSelector(
	selectFeature,
	(state) => state.user
);

export const userNameSelector = createSelector(
	selectFeature,
	(state) => state.user.login
);

export const errorSelector = createSelector(
	selectFeature,
	(state) => state.error
);
