import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist-immutable';
import localForage from 'localforage';
import {Map} from 'immutable';
import reducers from 'reducers';
import {callAPIMiddleware} from 'middleware/APIMiddleware';
import thunk from 'redux-thunk';

import App from 'containers/App';
import DevTools from 'containers/DevTools';

import 'stylesheets/global.scss';

const enhancer = process.env.NODE_ENV === 'production' ? compose(
	// Middleware you want to use in development:
	autoRehydrate(),
	applyMiddleware(thunk, callAPIMiddleware)
) : compose(
	// Middleware you want to use in production:
	autoRehydrate(),
	applyMiddleware(thunk, callAPIMiddleware),
	DevTools.instrument()
);
const initialStore = Map();

let store = createStore(reducers, initialStore, enhancer);
persistStore(store, {storage: localForage, keyPrefix: 'mysample-app'});

render(
	<Provider store={store}>
		<section>
			<App/>
			{process.env.NODE_ENV === 'production' ? null : <DevTools/>}
		</section>
	</Provider>
,
document.getElementById('react'));
