import { initStateAuthors } from '../authors/reducers';
import { initStateUser } from '../user/reducers';
import { initStateCourses } from './reducers';
import * as fromMySelectors from './selectors';

describe('selectFeature', () => {
	it('selectFeature users', () => {
		expect(
			fromMySelectors.selectFeature({
				user: initStateUser,
				courses: initStateCourses,
				authors: initStateAuthors,
			})
		).toEqual(initStateCourses);
	});
	it('isLoadingSelector should be falsy', () => {
		expect(
			fromMySelectors.isLoadingSelector.projector(initStateCourses)
		).toBeFalsy();
	});
	it('userSelector should be initStateCourses.user', () => {
		const expected = initStateCourses;
		expect(fromMySelectors.coursesSelector.projector(initStateCourses)).toEqual(
			expected.courses
		);
	});
	it('errorSelector  should be initStateCourses.error', () => {
		expect(fromMySelectors.errorSelector.projector(initStateCourses)).toEqual(
			initStateCourses.error
		);
	});
});
