import { AppContainer } from 'react-hot-loader'
import ReactDOM from 'react-dom'
import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import {persistStore, autoRehydrate} from 'redux-persist-immutable'
import localForage from 'localforage'
import createSagaMiddleware from 'redux-saga'
import {Map} from 'immutable'
import reducers from 'reducers'
import sagas from 'sagas'
import App from 'containers/App'
import DevTools from 'containers/DevTools'
import 'stylesheets/global.scss'

const sagaMiddleware = createSagaMiddleware()
const enhancer = process.env.NODE_ENV === 'production' ? compose(
	autoRehydrate(),
	applyMiddleware(sagaMiddleware)
) : compose(
	autoRehydrate(),
	applyMiddleware(sagaMiddleware),
	DevTools.instrument()
);
const initialStore = Map();

const output = document.createElement('DIV');
document.querySelector('body').appendChild(output);

const store = createStore(reducers, initialStore, enhancer);
if(module.hot) {
    // Enable webpack hot module replacement for reducers
	module.hot.accept(
		'reducers',
		() => store.replaceReducer(reducers)
	);
}
persistStore(store, {storage: localForage, keyPrefix: APP_TITLE});
sagaMiddleware.run(sagas);

// React Hot Loading!
const render = Component => ReactDOM.render(
	<Provider store={store}>
		<AppContainer>
			<div>
				<Component/>
				{process.env.NODE_ENV === 'production' ? null : <DevTools/>}
			</div>
		</AppContainer>
	</Provider>
, output);
render(App);
if (module.hot) module.hot.accept('containers/App', () => render(App));
