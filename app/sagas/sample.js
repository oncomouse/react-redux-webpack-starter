import { takeEvery, put } from 'redux-saga/effects'
import { SAMPLE_ACTION } from '../constants/ActionTypes'

/*
  This is the body of the saga. You can fetch APIs or anything
  else that is asynchronous.
*/
function* saga() {
    yield put({
        type: 'NOOP'
    })
}

/*
    This is the saga's origin. It just needs to be a collection
    of takeEvery calls for each action the saga will be observing.
*/
export default function* observe() {
    yield takeEvery(SAMPLE_ACTION, saga)
}
