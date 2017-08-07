import {takeEvery} from 'redux-saga/effects'
import {SAMPLE_ACTION} from 'constants/ActionTypes'

function* sampleSaga() {
	// Do saga-y stuff here:
	// fetch from APIs
	// select from store
	// take actions
	// put actions to the store
}

export default function* observeSample() {
	yield takeEvery(SAMPLE_ACTION, sampleSaga);
}