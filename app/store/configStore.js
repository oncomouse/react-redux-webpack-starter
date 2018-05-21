import { createStore, applyMiddleware, compose } from 'redux'
import {
    always
} from 'ramda'
import { PERSIST, SAGAS } from '../features'
import reducers from '../ducks'

const noopReduxMiddleware = () => next => action => next(action)

// Dynamically load redux-persist, if it is required for this project:
const combiner = PERSIST ? require('redux-persist').persistCombineReducers : require('redux').combineReducers
const storage = PERSIST ? require('redux-persist/es/storage').default : {}
const persistStore = PERSIST ? require('redux-persist').persistStore : always(null)

const persistConfig = {
    key: APP_TITLE
    , storage
}

// Dynamically load redux-saga if it is required for this project:
const createSagaMiddleware = SAGAS ? require('redux-saga').default : always(noopReduxMiddleware)
const sagas = SAGAS ? require('../sagas').default : always({})
const { START_SAGAS, createDynamicSaga } = SAGAS ? require('../utilities/createDynamicSaga') : { START_SAGAS: 'START_SAGAS', createDynamicSaga: always(null) }

// Only include redux-logger if we are in development
const loggerMiddleware = process.env.NODE_ENV !== 'production' ? require('redux-logger').default : noopReduxMiddleware

const makeReducer = PERSIST ?
    reducerObject => combiner(persistConfig, reducerObject)
    : reducerObject => combiner(reducerObject)

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
    if (SAGAS) {
        sagaMiddleware.run(createDynamicSaga(START_SAGAS, sagas()))
    }

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            store.replaceReducer(
                makeReducer(require('../reducers/index').default)
            )
        })
        if (SAGAS) {
            module.hot.accept('../sagas', () => {
                store.dispatch({
                    type: START_SAGAS
                    , payload: {
                        sagas: [...require('../sagas').default()]
                    }
                })
            })
        }
    }
    return { store, persistor }
}