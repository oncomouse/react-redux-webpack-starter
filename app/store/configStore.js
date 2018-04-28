import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import createSagaMiddleware from 'redux-saga'
import reducers from '../reducers'
import sagas from '../sagas'
import { START_SAGAS, createDynamicSaga } from '../utilities/createDynamicSaga'

/*
    Change this to combineReducers (imported from redux)
    and remove config if you don't need to persist Redux.
*/
const makeReducer = reducers => persistCombineReducers(
    {
        key: APP_TITLE
        , storage
    }
    , reducers
)

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
    const reducer = makeReducer(reducers)
    const initialStore = {}

    const store = createStore(reducer, initialStore, enhancer)
    const persistor = persistStore(store)
    sagaMiddleware.run(createDynamicSaga(START_SAGAS, sagas()))

    if (module.hot) {
    // Enable webpack hot module replacement for reducers
    
        module.hot.accept('../reducers/index', () =>
            store.replaceReducer(
                makeReducer(require('../reducers/index').default)
            )
        )
        module.hot.accept('../sagas', () =>
            store.dispatch({
                type: START_SAGAS
                , payload: {
                    sagas: [...require('../sagas').default()]
                }
            })
        )
    }
    return { store, persistor }
}