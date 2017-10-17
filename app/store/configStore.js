import {createStore, applyMiddleware, compose} from 'redux'
import {autoRehydrate} from 'redux-persist-immutable'
import createSagaMiddleware from 'redux-saga'
import {Map} from 'immutable'
import reducers from 'reducers'
import sagas from 'sagas'
import {START_SAGAS, createDynamicSaga} from 'utilities/createDynamicSaga'
import logger from 'redux-logger'

export default () => {
	const sagaMiddleware = createSagaMiddleware()
	const enhancer = process.env.NODE_ENV === 'production' ? compose(
		autoRehydrate(),
		applyMiddleware(sagaMiddleware)
	) : compose(
		autoRehydrate(),
		applyMiddleware(sagaMiddleware, logger)
	);
	const initialStore = Map();

	const store = createStore(reducers, initialStore, enhancer);
	sagaMiddleware.run(createDynamicSaga(START_SAGAS, sagas()))

	if(module.hot) {
	    // Enable webpack hot module replacement for reducers
		module.hot.accept(
			'reducers',
			() => store.replaceReducer(require('reducers').default)
		);
		module.hot.accept(
			'sagas',
			() => store.dispatch({
					type: START_SAGAS,
					payload: {
						sagas: [
							...require('sagas').default()
						]
					}
				})
		)
	}
	return store;
}
