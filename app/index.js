import { AppContainer } from 'react-hot-loader'
import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import configStore from './store/configStore'
import App from './containers/App'
import loadPolyfills from './utilities/loadPolyfills'
import './stylesheets/global.scss'

const { store, persistor } = configStore()

// React Hot Loading!
const output = document.getElementById('react')
const render = Component => ReactDOM.render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <Component />
    </Provider>
  </PersistGate>
  , output)
loadPolyfills().then(() => render(App))
if (module.hot) module.hot.accept(['containers/App'], () => render(App))