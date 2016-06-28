import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from 'reducers';
import {callAPIMiddleware} from 'middleware/APIMiddleware';
import thunk from 'redux-thunk';

//import DevTools from 'containers/DevTools';

import 'stylesheets/app.scss';

const enhancer = compose(
	// Middleware you want to use in development:
	applyMiddleware(thunk, callAPIMiddleware),
	//DevTools.instrument()
);
let store = createStore(reducers, {}, enhancer);

render(
	<Provider store={store}>
		<section>
		</section>
	</Provider>
,
document.getElementById('react'));
