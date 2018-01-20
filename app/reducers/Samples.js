import R from 'ramda'
import createReducer from '../utilities/createReducer'
import { SAMPLE_ACTION, RESET_STATE } from '../constants/ActionTypes'
//import { REHYDRATE } from 'redux-persist/constants'

const SAMPLE_LENGTH = 36
const STRING_LENGTH = 8

const initialState = {}
const actionMaps = {
  [SAMPLE_ACTION]: (state, action) => {
    const randomString = Math.random()
      .toString(SAMPLE_LENGTH)
      .replace(/[^a-z]+/g, '')
      .substr(0, STRING_LENGTH - 1)
    state = R.assoc(randomString, randomString, state)
    return state
  }
  , [RESET_STATE]: (state, action) => {
    return initialState
  }
  // Do something at REHYDRATE (when persisted store loads from storage)
  //[REHYDRATE]: (state, action) => {
  //	return state;
  //}
}

export default createReducer(initialState, actionMaps)