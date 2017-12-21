import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import createSagaMiddleware from 'redux-saga'
import reducers from '../reducers'
import sagas from '../sagas'
import { START_SAGAS, createDynamicSaga } from '../utilities/createDynamicSaga'

export default () => {
    const sagaMiddleware = createSagaMiddleware()
    const enhancer =
    process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(sagaMiddleware))
        : compose(
            applyMiddleware(
                sagaMiddleware
                , require('redux-logger').default
            ) // Only include redux-logger if we are in development
        )
    const reducer = persistCombineReducers(
        {
            key: APP_TITLE
            , storage
        }
        , reducers
    )
    const initialStore = {}

    const store = createStore(reducer, initialStore, enhancer)
    const persistor = persistStore(store)
    sagaMiddleware.run(createDynamicSaga(START_SAGAS, sagas()))

    if (module.hot) {
    // Enable webpack hot module replacement for reducers
        module.hot.accept('reducers', () =>
            store.replaceReducer(require('reducers').default)
        )
        module.hot.accept('sagas', () =>
            store.dispatch({
                type: START_SAGAS
                , payload: {
                    sagas: [...require('sagas').default()]
                }
            })
        )
    }
    return { store, persistor }
}