import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from 'reducers';
import {callAPIMiddleware} from 'middleware/APIMiddleware';
import thunk from 'redux-thunk';

import App from 'containers/App';
import DevTools from 'containers/DevTools';

import 'stylesheets/global.scss';

const enhancer = process.env.NODE_ENV === 'production' ? compose(
	// Middleware you want to use in development:
	applyMiddleware(thunk, callAPIMiddleware)
) : compose(
	// Middleware you want to use in production:
	applyMiddleware(thunk, callAPIMiddleware),
	DevTools.instrument()
);
let store = createStore(reducers, {}, enhancer);

render(
	<Provider store={store}>
		<section>
			<App/>
			{process.env.NODE_ENV === 'production' ? null : <DevTools/>}
		</section>
	</Provider>
,
document.getElementById('react'));
