import { AppContainer } from 'react-hot-loader'
import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import localForage from 'localforage'
import configStore from './store/configStore'
import App from './containers/App'
import loadPolyfills from './utilities/loadPolyfills'
import './stylesheets/global.scss'

const store = configStore()

class AppProvider extends React.Component {
  constructor() {
    super()
    this.state = { rehydrated: false }
  }

  componentWillMount(){
    persistStore(store, {
      storage: localForage
      , keyPrefix: APP_TITLE
    }, () => {
      this.setState({ rehydrated: true })
    })
  }

  render() {
    if(!this.state.rehydrated){
      return (<h1>
Loading
      </h1>)
    }
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

// React Hot Loading!
const output = document.getElementById('react')
const render = Component => ReactDOM.render(
  <AppContainer>
    <Component />
  </AppContainer>
  , output)
loadPolyfills().then(() => render(AppProvider))
if (module.hot) module.hot.accept(['containers/App'], () => render(AppProvider))