import { AppContainer } from 'react-hot-loader'
import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import configStore from './store/configStore'
import App from './containers/App'
import loadPolyfills from './utilities/loadPolyfills'
<<<<<<< HEAD
=======
import registerServiceWorker from './utilities/registerServiceWorker'
>>>>>>> 3d427d6b473eaede6fb92f2f59fa9c95fcd8bd8b

const { store, persistor } = configStore()

// React Hot Loading!
const output = document.getElementById('react')
const render = Component => ReactDOM.render(
  <AppContainer>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <Component />
      </Provider>
    </PersistGate>
  </AppContainer>
<<<<<<< HEAD
  , output)
loadPolyfills().then(() => render(App))
=======
  , output
)
loadPolyfills().then(() => render(App)).then(() => registerServiceWorker())
>>>>>>> 3d427d6b473eaede6fb92f2f59fa9c95fcd8bd8b
if (module.hot) module.hot.accept(['containers/App'], () => render(App))