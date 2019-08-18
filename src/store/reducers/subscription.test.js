import { subscribeSuccess } from '../actions/subscription';
import subscriptionReducer from '../reducers/subscription';

describe('subscription reducer', () => {
	const initialState = {
		success: false
	};

	it('returns default initial state when no action is passed', () => {
		const newState = subscriptionReducer(undefined, {});

		expect(newState).toEqual(initialState);
	});

	it('should setup success message', () => {
		const newState = subscriptionReducer(initialState, subscribeSuccess());
		const expectedState = {
			success: true
		};

		expect(newState).toEqual(expectedState);
	});
});
