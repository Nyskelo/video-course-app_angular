/* eslint-disable @typescript-eslint/no-explicit-any */
import { mockAuthors } from 'src/app/utils/authors-api';
import * as AuthorsAction from './actions';
import * as fromMyReducers from './reducers';

let error!: null;
const state = fromMyReducers.initStateAuthors;

describe('Reduser: Authors', () => {
	describe('Get Authors', () => {
		it('should set isLoading to true', () => {
			const expected = { ...state, isLoading: true };
			const action = AuthorsAction.getAuthors;
			expect(fromMyReducers.authorsReducers(undefined, action)).toEqual(
				expected
			);
		});
		it('Success --> should fetch all authors', () => {
			const expected = { ...state, isLoading: false, authors: mockAuthors };
			const action = AuthorsAction.getAuthorsSuccess({ authors: mockAuthors });
			console.log(fromMyReducers.authorsReducers(undefined, action));

			expect(fromMyReducers.authorsReducers(undefined, action)).toEqual(
				expected
			);
		});
		it('Failure --> should set error to null', () => {
			const expected = { ...state, error: error };
			const action = AuthorsAction.getAuthorsFailure;
			expect(fromMyReducers.authorsReducers(undefined, action)).toEqual(
				expected
			);
		});
	});
	describe('Add Authors', () => {
		it('should set isLoading to true', () => {
			const expected = { ...state, isLoading: true };
			const action = AuthorsAction.addAuthor;
			expect(fromMyReducers.authorsReducers(undefined, action)).toEqual(
				expected
			);
		});
		it('Success --> should add new author', () => {
			const mockAuthor = Object.assign({}, mockAuthors[0], { id: 111222333 });
			const expected = {
				...state,
				isLoading: false,
				authors: [...state.authors, mockAuthor],
			};
			const action = AuthorsAction.addAuthorSuccess({ author: mockAuthor });
			expect(fromMyReducers.authorsReducers(undefined, action)).toEqual(
				expected
			);
		});
		it('Failure --> should set error to null', () => {
			const expected = { ...state, error: error };
			const action = AuthorsAction.addAuthorFailure;
			expect(fromMyReducers.authorsReducers(undefined, action)).toEqual(
				expected
			);
		});
	});
	describe('Delete Authors', () => {
		it('should set isLoading to true', () => {
			const expected = { ...state, isLoading: true };
			const action = AuthorsAction.deleteAuthor;
			expect(fromMyReducers.authorsReducers(undefined, action)).toEqual(
				expected
			);
		});
		it('Success --> should delete author', () => {
			const oldState = { ...state, authors: mockAuthors };
			const toDeleteAuthor = mockAuthors[0];
			const newState = {
				...oldState,
				isLoading: false,
				authors: [
					...oldState.authors.filter(
						(author) => author.id !== toDeleteAuthor.id
					),
				],
			};
			const action = AuthorsAction.deleteAuthorSuccess({
				author: toDeleteAuthor,
			});
			expect(fromMyReducers.authorsReducers(oldState, action)).toEqual(
				newState
			);
		});
		it('Failure --> should set error to null', () => {
			const expected = { ...state, error: error };
			const action = AuthorsAction.deleteAuthorFailure;
			expect(fromMyReducers.authorsReducers(undefined, action)).toEqual(
				expected
			);
		});
	});
});
