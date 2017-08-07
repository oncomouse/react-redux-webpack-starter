import { render } from 'react-dom';
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
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
	autoRehydrate(),
	applyMiddleware(thunk, callAPIMiddleware)
) : compose(
	autoRehydrate(),
	applyMiddleware(thunk, callAPIMiddleware),
	DevTools.instrument()
);
const initialStore = Map();

const output = document.createElement('DIV');
document.querySelector('body').appendChild(output);

const store = createStore(reducers, initialStore, enhancer);
persistStore(store, {storage: localForage, keyPrefix: 'mysample-app'});

render(
	<Provider store={store}>
		<section>
			<App/>
			{process.env.NODE_ENV === 'production' ? null : <DevTools/>}
		</section>
	</Provider>
,
output);
