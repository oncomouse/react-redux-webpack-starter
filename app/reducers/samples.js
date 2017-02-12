import { Map } from 'immutable';
import createReducer from 'utilities/createReducer';
import { SAMPLE_ACTION } from 'constants/ActionTypes';

const initialState = Map();
const actionMaps = {
	[SAMPLE_ACTION]: (state, action) => {
		return state;
	}
}

export default createReducer(initialState, actionMaps);