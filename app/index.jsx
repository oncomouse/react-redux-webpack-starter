import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { PERSIST } from './features'
import configStore from './store/configStore'
import App from './containers/App'
import loadPolyfills from './utilities/loadPolyfills'
import registerServiceWorker from './utilities/registerServiceWorker'

const { store, persistor } = configStore()

const noopReactComponent = ({children}) => (<span>{children}</span>)

// Load HMR and Error Handling dev tooling:
const AppContainer = process.env.NODE_ENV !== 'production' ? require('react-hot-loader').AppContainer : noopReactComponent
const RedBox = process.env.NODE_ENV !== 'production' ? require('redbox-react').default : noopReactComponent

const PersistGate = PERSIST ? require('redux-persist/lib/integration/react').PersistGate : noopReactComponent

// React Hot Loading!
const output = document.getElementById('react')
const render = Component => ReactDOM.render(
    <AppContainer errorReporter={RedBox}>
        <PersistGate persistor={persistor}>
            <Provider store={store}>
                <Component />
            </Provider>
        </PersistGate>
    </AppContainer>
    , output
)
//loadPolyfills().then(() => render(App)).then(() => registerServiceWorker())
loadPolyfills(() => {
    render(App)
    registerServiceWorker()
})
if (module.hot) module.hot.accept(['containers/App'], () => render(App))