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
const makeReducer = reducerObject => persistCombineReducers(
    {
        key: APP_TITLE
        , storage
    }
    , reducerObject
)

// Only include redux-logger if we are in development
const noopMiddleware = () => next => action => next(action)
const loggerMiddleware = process.env.NODE_ENV !== 'production' ? require('redux-logger').default : noopMiddleware

export default () => {
    const sagaMiddleware = createSagaMiddleware()
    const enhancer = compose(
        applyMiddleware(
            sagaMiddleware
            , loggerMiddleware
        )
    )
    const reducer = makeReducer(reducers)
    const initialStore = {}

    const store = createStore(reducer, initialStore, enhancer)
    const persistor = persistStore(store)
    sagaMiddleware.run(createDynamicSaga(START_SAGAS, sagas()))

    if (module.hot) {
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