import {
    assoc
} from 'ramda'
import createReducer from '../utilities/createReducer'
import { SAMPLE_ACTION, RESET_STATE } from '../constants/ActionTypes'
// import { REHYDRATE } from 'redux-persist/constants'

const SAMPLE_LENGTH = 36
const STRING_LENGTH = 8

const initialState = {}
const actionMaps = {
    [SAMPLE_ACTION]: (state, action) => { // eslint-disable-line no-unused-vars
        const randomString = Math.random()
            .toString(SAMPLE_LENGTH)
            .replace(/[^a-z]+/g, '')
            .substr(0, STRING_LENGTH - 1)
        return assoc(randomString, randomString, state)
    }
    , [RESET_STATE]: (state, action) => initialState // eslint-disable-line no-unused-vars
    // Do something at REHYDRATE (when persisted store loads from storage)
    // [REHYDRATE]: (state, action) => {
    //   return state;
    // }
}

export default createReducer(initialState, actionMaps)