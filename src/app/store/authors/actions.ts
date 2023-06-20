import { createAction, props } from '@ngrx/store';
import { Author } from 'src/app/utils/global.model';

//get Authors
export const getAuthors = createAction('[Authors] Get Authors');
export const getAuthorsSuccess = createAction(
	'[Authors] Get Authors success',
	props<{ authors: Author[] }>()
);
export const getAuthorsFailure = createAction(
	'[Authors] Get Authors failure',
	props<{ error: string }>()
);

//delete Authors
export const deleteAuthor = createAction(
	'[Authors] Delete Authors',
	props<{ author: Author }>()
);
export const deleteAuthorSuccess = createAction(
	'[Author] Delete Author success',
	props<{ author: Author }>()
);
export const deleteAuthorFailure = createAction(
	'[Author] Delete Author failure',
	props<{ error: string }>()
);

//Add Authors
export const addAuthor = createAction(
	'[Author] Add Authors',
	props<{ author: Author }>()
);
export const addAuthorSuccess = createAction(
	'[Authors] Add Author success',
	props<{ author: Author }>()
);
export const addAuthorFailure = createAction(
	'[Author] Add Author failure',
	props<{ error: string }>()
);
