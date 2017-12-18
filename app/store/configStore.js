import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { autoRehydrate } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import reducers from '../reducers'
import sagas from '../sagas'
import { START_SAGAS, createDynamicSaga } from '../utilities/createDynamicSaga'

export default () => {
  const sagaMiddleware = createSagaMiddleware()
  const enhancer = process.env.NODE_ENV === 'production' ? compose(
    autoRehydrate(),
    applyMiddleware(sagaMiddleware)
  ) : compose(
    autoRehydrate(),
    applyMiddleware(
      sagaMiddleware
      , require('redux-logger').default
    ) // Only include redux-logger if we are in development
  )
  const reducer = combineReducers(reducers)
  const initialStore = {}

  const store = createStore(reducer, initialStore, enhancer)
  sagaMiddleware.run(createDynamicSaga(START_SAGAS, sagas()))

  if(module.hot) {
    // Enable webpack hot module replacement for reducers
    module.hot.accept(
      'reducers',
      () => store.replaceReducer(require('reducers').default)
    )
    module.hot.accept(
      'sagas',
      () => store.dispatch({
        type: START_SAGAS
        , payload: {
          sagas: [
            ...require('sagas').default()
          ]
        }
      })
    )
  }
  return store
}