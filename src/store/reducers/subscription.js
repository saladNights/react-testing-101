import * as actionTypes from '../actions/actionTypes';

const initialState = {
	success: false
};

export default (state=initialState, action) => {
	switch (action.type) {
		case actionTypes.SUBSCRIBE_SUCCESS:
			return {
				...state,
				...{ success: true }
			};
		default:
			return state;
	}
}
