import { take, fork, cancel, all } from 'redux-saga/effects';

export const START_SAGAS = Symbol('START_SAGAS');
export function createDynamicSaga(changeActionType, startingSagas) {
  function* start(sagas) {
    try {
      yield all(sagas);
    } catch (e) {
      throw new Error(e);
    }
  }
  return function* dynamicSaga() {
    let action;
    let rootTask = yield fork(start, startingSagas);
    // eslint-disable-next-line no-cond-assign
    while ((action = yield take(changeActionType))) {
      yield cancel(rootTask);
      rootTask = yield fork(start, action.payload.sagas);
    }
  };
}
