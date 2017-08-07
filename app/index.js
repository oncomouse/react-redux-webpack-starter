import { AppContainer } from 'react-hot-loader'
import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import configStore from 'store/configStore'
import App from 'containers/App'
import 'stylesheets/global.scss'

const store = configStore();

// React Hot Loading!
const output = document.createElement('DIV');
document.querySelector('body').appendChild(output);
const render = Component => ReactDOM.render(
	<Provider store={store}>
		<AppContainer>
			<Component/>
		</AppContainer>
	</Provider>
, output);
render(App);
if (module.hot) module.hot.accept('containers/App', () => render(App));
