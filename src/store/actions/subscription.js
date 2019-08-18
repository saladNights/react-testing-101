import axios from 'axios';
import * as actionTypes from './actionTypes';

export const subscribeSuccess = () => {
	return {
		type: actionTypes.SUBSCRIBE_SUCCESS
	}
};

export const subscribe = (email) => {
	return dispatch => {
		return axios
			.post('https://react-testing-101.firebaseio.com/subscribers.json', { email })
			.then((response) => {
				const { status } = response;

				if (status === 200) dispatch(subscribeSuccess());
			});
	};
};
