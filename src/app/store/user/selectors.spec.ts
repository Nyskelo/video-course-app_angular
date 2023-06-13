import { initStateCourses } from '../courses/reducers';
import { initStateUser } from './reducers';
import * as fromMySelectors from './selectors';

describe('isLoggedInSelector', () => {
	it('selectFeature users', () => {
		expect(
			fromMySelectors.selectFeature({
				user: initStateUser,
				courses: initStateCourses,
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
	it('userNameSelector should be initStateUser.user.login', () => {
		expect(fromMySelectors.userNameSelector.projector(initStateUser)).toEqual(
			initStateUser.user.login
		);
	});
	it('errorSelector  should be initStateUser.error', () => {
		expect(fromMySelectors.errorSelector.projector(initStateUser)).toEqual(
			initStateUser.error
		);
	});
});
