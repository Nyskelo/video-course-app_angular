import { initStateAuthors } from '../authors/reducers';
import { initStateCourses } from '../courses/reducers';
import { initStateUser } from './reducers';
import * as fromMySelectors from './selectors';

describe('isLoggedInSelector', () => {
	it('selectFeature users', () => {
		expect(
			fromMySelectors.selectFeature({
				user: initStateUser,
				courses: initStateCourses,
				authors: initStateAuthors,
			})
		).toEqual(initStateUser);
	});
	it('isLoggedInSelector should be falsy', () => {
		expect(
			fromMySelectors.isLoggedInSelector.projector(initStateUser)
		).toBeFalsy();
	});
	it('userSelector should be initStateUser.user', () => {
		const expected = initStateUser;
		expect(fromMySelectors.userSelector.projector(initStateUser)).toEqual(
			expected.user
		);
	});

	it('errorSelector  should be initStateUser.error', () => {
		expect(fromMySelectors.errorSelector.projector(initStateUser)).toEqual(
			initStateUser.error
		);
	});
});
