import R from 'ramda'
import createReducer from '../utilities/createReducer'
import { SAMPLE_ACTION, RESET_STATE } from '../constants/ActionTypes'
//import { REHYDRATE } from 'redux-persist/constants'

<<<<<<< HEAD
const SAMPLE_SIZE = 36
=======
const SAMPLE_LENGTH = 36
>>>>>>> 3d427d6b473eaede6fb92f2f59fa9c95fcd8bd8b
const STRING_LENGTH = 8

const initialState = {}
const actionMaps = {
  [SAMPLE_ACTION]: (state, action) => {
    const randomString = Math.random()
<<<<<<< HEAD
      .toString(SAMPLE_SIZE)
=======
      .toString(SAMPLE_LENGTH)
>>>>>>> 3d427d6b473eaede6fb92f2f59fa9c95fcd8bd8b
      .replace(/[^a-z]+/g, '')
      .substr(0, STRING_LENGTH - 1)
    state = R.assoc(randomString, randomString, state)
    return state
  }
  , [RESET_STATE]: (state, action) => {
<<<<<<< HEAD
    return {}
=======
    return initialState
>>>>>>> 3d427d6b473eaede6fb92f2f59fa9c95fcd8bd8b
  }
  // Do something at REHYDRATE (when persisted store loads from storage)
  //[REHYDRATE]: (state, action) => {
  //	return state;
  //}
}

export default createReducer(initialState, actionMaps)