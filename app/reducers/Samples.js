import {Map} from 'immutable'
import createReducer from 'utilities/createReducer'
import {SAMPLE_ACTION, RESET_STATE} from 'constants/ActionTypes'
import {REHYDRATE} from 'redux-persist/constants'

const initialState = Map();
const actionMaps = {
	[SAMPLE_ACTION]: (state, action) => {
		const randomString = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 7);
		state = state.set(randomString, randomString);
		return state;
	},
	[RESET_STATE]: (state, action) => {
		return Map();
	}
	// Do something at REHYDRATE (when persisted store loads from storage)
	//[REHYDRATE]: (state, action) => {
	//	return state;
	//}
}

export default createReducer(initialState, actionMaps);