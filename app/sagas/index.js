import {all} from 'redux-saga/effects'
import sampleSaga from 'sagas/sample'

export default function* rootSaga() {
	yield all([
		sampleSaga()
	])
}