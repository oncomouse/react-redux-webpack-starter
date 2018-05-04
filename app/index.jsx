import ReactDOM from 'react-dom'
import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { PERSIST } from './features'
import configStore from './store/configStore'
import App from './containers/App'
import loadPolyfills from './utilities/loadPolyfills'
import registerServiceWorker from './utilities/registerServiceWorker'

const { store, persistor } = configStore()

const noopReactComponent = ({ children }) => (<span>{children}</span>)
noopReactComponent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node)
        , PropTypes.node
    ]).isRequired
}

// Load HMR and Error Handling dev tooling:
const ErrorBoundary = process.env.NODE_ENV !== 'production' ? require('./components/util/Error').default : noopReactComponent

// Only load a Persist Gate if project uses a persistent store:
const PersistGate = PERSIST ? require('redux-persist/lib/integration/react').PersistGate : noopReactComponent

// React Hot Loading!
const output = document.getElementById('react')
const render = (Component) => {
    ReactDOM.render(
        <ErrorBoundary>
            <PersistGate persistor={persistor}>
                <Provider store={store}>
                    <Component />
                </Provider>
            </PersistGate>
        </ErrorBoundary>
        , output
    )
}
// loadPolyfills().then(() => render(App)).then(() => registerServiceWorker())
loadPolyfills(() => {
    render(App)
    registerServiceWorker()
})
if (module.hot) {
    module.hot.accept(['containers/App'], () => render(require('./containers/App').default))
}