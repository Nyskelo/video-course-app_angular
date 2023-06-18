import { initStateCourses } from '../courses/reducers';
import { initStateUser } from '../user/reducers';
import { initStateAuthors } from './reducers';
import * as fromMySelectors from './selectors';

describe('selectFeature', () => {
	it('selectFeature authors', () => {
		expect(
			fromMySelectors.selectFeature({
				user: initStateUser,
				courses: initStateCourses,
				authors: initStateAuthors,
			})
		).toEqual(initStateAuthors);
	});
	it('isLoadingSelector should be falsy', () => {
		expect(
			fromMySelectors.isLoadingSelector.projector(initStateAuthors)
		).toBeFalsy();
	});
	it('authorsSelector should be initStateAuthors.authors', () => {
		const expected = initStateAuthors;
		expect(fromMySelectors.authorsSelector.projector(initStateAuthors)).toEqual(
			expected.authors
		);
	});
	it('errorSelector  should be initStateAuthors.error', () => {
		expect(fromMySelectors.errorSelector.projector(initStateAuthors)).toEqual(
			initStateAuthors.error
		);
	});
});
