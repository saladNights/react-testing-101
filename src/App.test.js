import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';

import App from './App';
import { findByTestAttr, storeFactory } from './test/testUtils';
import moxios from "moxios";
import {subscribe} from "./store/actions/subscription";

describe('Component', () => {
  let wrapper;
  let store;
  const initialState = {
  	subscription: {
  		success: false
  	}
  };
	const props = {
		onSubscribe: jest.fn(),
		success: false
	};

  beforeEach(() => {
    wrapper = shallow(<App.WrappedComponent {...props} />);
  });

	it('renders without crashing', () => {
		expect(wrapper.exists()).toBe(true);
	});

	it("matches the snapshot", () => {
		expect(wrapper.debug()).toMatchSnapshot();
	});

	it('show form', () => {
		const subscribeBtn = findByTestAttr(wrapper, 'subscribe');

		subscribeBtn.simulate('click');

		const form = findByTestAttr(wrapper, 'subscribe-form');

		expect(form.length).toBe(1);
	});

	// Тестирование реализации: bad example
	it('show form', () => {
		const subscribeBtn = wrapper.find('.subscribe-btn');

		subscribeBtn.simulate('click');

		const form = wrapper.find('.subscribe-form');

		expect(form.length).toBe(1);
	});

	it('should call subscribe with email', () => {
		const subscribeBtn = findByTestAttr(wrapper, 'subscribe');

		subscribeBtn.simulate('click');

		const input = findByTestAttr(wrapper, 'subscribe-input');

		input.simulate('change', {target: {value: 'blah@gmail.com'}});

		const submit = findByTestAttr(wrapper, 'subscribe-submit');
		const fakeEvent = { preventDefault: () => {} };

		submit.simulate('click', fakeEvent);

		expect(props.onSubscribe).toHaveBeenCalledWith('blah@gmail.com');
	});

	it('should show success message', async () => {
		store = storeFactory(initialState);
		wrapper = mount(<Provider store={store}><App {...props} /></Provider>);
		const subscribeBtn = findByTestAttr(wrapper, 'subscribe');

		moxios.install();

		subscribeBtn.simulate('click');

		const input = findByTestAttr(wrapper, 'subscribe-input');

		input.simulate('change', {target: {value: 'blah@gmail.com'}});

		const submit = findByTestAttr(wrapper, 'subscribe-submit');
		const fakeEvent = { preventDefault: () => {} };

		submit.simulate('click', fakeEvent);

		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200
			});
		});

		await store.dispatch(subscribe());

		wrapper = wrapper.update();

		const successMessage = findByTestAttr(wrapper, 'success-msg');

		expect(successMessage.length).toBe(1);
		moxios.uninstall();
	});
});
