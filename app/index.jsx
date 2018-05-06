import ReactDOM from 'react-dom'
import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { injectGlobal } from 'styled-components'
import { normalize } from 'polished'
import { PERSIST } from './features'
import configStore from './store/configStore'
import App from './containers/App'
import loadPolyfills from './utilities/loadPolyfills'
import registerServiceWorker from './utilities/registerServiceWorker'

injectGlobal`
  ${normalize()}
`

const { store, persistor } = configStore()

const noopReactComponent = ({ children }) => (<span>{children}</span>)
noopReactComponent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node)
        , PropTypes.node
    ]).isRequired
}

// Only load a Persist Gate if project uses a persistent store:
const ErrorBoundary = process.env.NODE_ENV !== 'production' ? require('./components/util/Error').default : noopReactComponent
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
loadPolyfills(() => {
    render(App)
    registerServiceWorker()
})
if (module.hot) {
    module.hot.accept(['containers/App'], () => render(require('./containers/App').default))
}