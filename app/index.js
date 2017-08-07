import { render } from 'react-dom';
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import {persistStore, autoRehydrate} from 'redux-persist-immutable';
import localForage from 'localforage';
import createSagaMiddleware from 'redux-saga'
import {Map} from 'immutable';
import reducers from 'reducers';
import sagas from 'sagas'

import App from 'containers/App';
import DevTools from 'containers/DevTools';

import 'stylesheets/global.scss';

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
persistStore(store, {storage: localForage, keyPrefix: 'mysample-app'});
sagaMiddleware.run(sagas);

render(
	<Provider store={store}>
		<section>
			<App/>
			{process.env.NODE_ENV === 'production' ? null : <DevTools/>}
		</section>
	</Provider>
,
output);
