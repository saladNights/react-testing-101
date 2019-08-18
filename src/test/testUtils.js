import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from "redux-thunk";
import subscriptionReducer from "../store/reducers/subscription";

export const findByTestAttr = (wrapper, val) => {
	return wrapper.find(`[data-testid='${val}']`);
};

export const storeFactory = (initialState) => {
	const rootReducer = combineReducers({
		subscription: subscriptionReducer
	});

	const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

	return createStoreWithMiddleware(rootReducer, initialState);
};
