import { createStore, applyMiddleware, compose } from 'redux';
import { always } from 'ramda';
import thunk from 'redux-thunk';
import { PERSIST } from '../features';
import reducers from '../ducks';

const noopReduxMiddleware = () => next => action => next(action);

// Dynamically load redux-persist, if it is required for this project:
const combiner = PERSIST ? require('redux-persist').persistCombineReducers : require('redux').combineReducers;
const storage = PERSIST ? require('redux-persist/es/storage').default : {};
const persistStore = PERSIST ? require('redux-persist').persistStore : always(null);

const persistConfig = {
  key: APP_TITLE,
  storage,
};

// Only include redux-logger if we are in development
const loggerMiddleware = process.env.NODE_ENV !== 'production' ? require('redux-logger').default : noopReduxMiddleware; // eslint-disable-line import/no-extraneous-dependencies

const makeReducer = PERSIST ?
  reducerObject => combiner(persistConfig, reducerObject)
  : reducerObject => combiner(reducerObject);

export default () => {
  const enhancer = compose(applyMiddleware(
    thunk
    , loggerMiddleware,
  ));
  const reducer = makeReducer(reducers);
  const initialStore = {};

  const store = createStore(reducer, initialStore, enhancer);
  const persistor = persistStore(store);

  if (module.hot) {
    module.hot.accept('../ducks/index', () =>
      store.replaceReducer(makeReducer(require('../ducks/index').default)));// eslint-disable-line global-require
  }
  return { store, persistor };
};
