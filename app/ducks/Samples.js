// https://github.com/erikras/ducks-modular-redux
import {
  assoc,
} from 'ramda';
import { takeEvery, put } from 'redux-saga/effects';
// import { REHYDRATE } from 'redux-persist/constants'
import createReducer from '../utilities/createReducer';

// Symbols:

const SAMPLE_ACTION = Symbol('SAMPLE_ACTION');
const RESET_STATE = Symbol('RESET_STATE');

const SAMPLE_LENGTH = 36;
const STRING_LENGTH = 8;

const initialState = {};
const actionMaps = {
  [SAMPLE_ACTION]: (state, action) => { // eslint-disable-line no-unused-vars
    const randomString = Math.random()
      .toString(SAMPLE_LENGTH)
      .replace(/[^a-z]+/g, '')
      .substr(0, STRING_LENGTH - 1);
    return assoc(randomString, randomString, state);
  },
  [RESET_STATE]: (state, action) => initialState, // eslint-disable-line no-unused-vars
  // Do something at REHYDRATE (when persisted store loads from storage)
  // [REHYDRATE]: (state, action) => {
  //   return state;
  // }
};

export const sampleAction = () => ({
  type: SAMPLE_ACTION,
});
export const resetAction = () => ({
  type: RESET_STATE,
});

function* sampleActionSaga() {
  yield put({
    type: 'NOOP',
  });
}

/*
    This is the saga's origin. It just needs to be a collection
    of takeEvery calls for each action the saga will be observing.
*/
export function* saga() {
  yield takeEvery(SAMPLE_ACTION, sampleActionSaga);
}

export default createReducer(initialState, actionMaps);
