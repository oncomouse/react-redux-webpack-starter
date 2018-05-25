import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import configStore from './store/configStore';
import App from './containers/App';
import ErrorBoundary from './components/util/Error';
import loadPolyfills from './utilities/loadPolyfills';
import registerServiceWorker from './utilities/registerServiceWorker';

/*
    To disable redux-persist:

    1. Remove import of PeristGate;
    2. Change line that calls configStore to const {store} = configStore();
    3. Remove <PersistGate persistor={persistor}>;
    4. Remove </PersistGate>;

    Also, make changes in ../store/configStore.js
*/

const { store, persistor } = configStore();

// React Hot Loading!
const output = document.getElementById('react');
const render = (Component) => {
  ReactDOM.render(
    <ErrorBoundary>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <Component />
        </Provider>
      </PersistGate>
    </ErrorBoundary>
    , output,
  );
};
loadPolyfills(() => {
  render(App);
  registerServiceWorker();
});
if (module.hot) {
  // eslint-disable-next-line global-require
  module.hot.accept(['containers/App'], () => render(require('./containers/App').default));
}
