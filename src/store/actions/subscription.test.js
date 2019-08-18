import moxios from 'moxios';
import { storeFactory } from '../../test/testUtils';
import { subscribe } from "./subscription";

describe('subscribe action creator', () => {
	beforeEach(() => {
		moxios.install();
	});
	afterEach(() => {
		moxios.uninstall();
	});

	it('set success to state',  async () => {
		const initialState = {
			subscription: {
				success: false
			}
		};
		const store = storeFactory(initialState);

		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200
			});
		});

		await store.dispatch(subscribe());

		const newState = store.getState();

		expect(newState.subscription.success).toBe(true);
	});
});
