import { Map } from 'immutable'
import createReducer from 'utilities/createReducer'
import { SAMPLE_ACTION } from 'constants/ActionTypes'
import {REHYDRATE} from 'redux-persist/constants'

const initialState = Map();
const actionMaps = {
	[SAMPLE_ACTION]: (state, action) => {
		return state;
	},
	// Do something at REHYDRATE (when persisted store loads from storage)
	//[REHYDRATE]: (state, action) => {
	//	return state;
	//}
}

export default createReducer(initialState, actionMaps);