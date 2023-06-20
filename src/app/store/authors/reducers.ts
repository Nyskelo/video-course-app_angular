/* eslint-disable @typescript-eslint/no-explicit-any */
import { Author } from 'src/app/utils/global.model';
import { createReducer, on } from '@ngrx/store';
import * as AuthorsAction from './actions';

export interface AuthorsStateInterface {
	isLoading: boolean;
	authors: Author[];
	error: string | null;
}
export const initStateAuthors: AuthorsStateInterface = {
	isLoading: false,
	authors: [],
	error: null,
};

export const authorsReducers = createReducer(
	initStateAuthors,
	//Get authors
	on(AuthorsAction.getAuthors, (state) => ({
		...state,
		isLoading: true,
	})),
	on(AuthorsAction.getAuthorsSuccess, (state, action) => ({
		...state,
		isLoading: false,
		authors: [...state.authors, ...action.authors],
	})),
	on(AuthorsAction.getAuthorsFailure, (state, action) => ({
		...state,
		isLoading: false,
		error: action.error,
	})),

	//Delete author
	on(AuthorsAction.deleteAuthor, (state) => ({
		...state,
		isLoading: true,
	})),
	on(AuthorsAction.deleteAuthorSuccess, (state, action) => ({
		...state,
		isLoading: false,
		authors: state.authors.filter((author) => author.id !== action.author.id),
	})),
	on(AuthorsAction.deleteAuthorFailure, (state, action) => ({
		...state,
		isLoading: false,
		error: action.error,
	})),

	//Add course
	on(AuthorsAction.addAuthor, (state) => ({
		...state,
		isLoading: true,
	})),
	on(AuthorsAction.addAuthorSuccess, (state, action) => ({
		...state,
		isLoading: false,
		authors: [...state.authors, action.author],
	})),
	on(AuthorsAction.addAuthorFailure, (state, action) => ({
		...state,
		isLoading: false,
		error: action.error,
	}))
);
