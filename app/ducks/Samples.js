// https://github.com/erikras/ducks-modular-redux
import {
    assoc
    , identity
} from 'ramda';
// import { REHYDRATE } from 'redux-persist/constants'
import createReducer from '../utilities/createReducer';

// Symbols:
const SAMPLE_ACTION = Symbol('SAMPLE_ACTION');
const RESET_STATE = Symbol('RESET_STATE');
const ERROR = Symbol('ERROR');

// Reducers:
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
    }
    , [ERROR]: identity
    , [RESET_STATE]: (state, action) => initialState // eslint-disable-line no-unused-vars
    // Do something at REHYDRATE (when persisted store loads from storage)
    // [REHYDRATE]: (state, action) => {
    //   return state;
    // }
};

// Cause fetch to error:
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

// Actions:
const sampleResultAction = () => ({
    type: SAMPLE_ACTION
});
export const errorAction = error => ({
    type: ERROR,
    payload: {error}
})
export const resetAction = () => ({
    type: RESET_STATE
});
export const sampleAction = () => dispatch => fetch('http://localhost:8080')
    .then(checkStatus)
    .then(() => dispatch(sampleResultAction()))
    .catch(error => dispatch(errorAction(error)));

// Create and export our reducer:
export default createReducer(initialState, actionMaps);