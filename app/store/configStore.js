import { createStore, applyMiddleware } from 'redux'; // combineReducers
import thunk from 'redux-thunk';
import storage from 'redux-persist/es/storage';
import { persistCombineReducers, persistStore } from 'redux-persist';
import reducers from '../ducks';

/*
    To disable redux-persist:

    1. Import combineReducers in the 'redux' import;
    2. Remove the two import statements from redux-persist;
    3. Remove persistConfig object;
    4. Change makeReducer to equal r => combineReducers(r);
    5. Remove call to persistStore;
    6. Change the return statement to { store };

    Also, make changes in ../index.jsx
*/

const noopReduxMiddleware = () => next => action => next(action);

const persistConfig = {
    key: APP_TITLE
    , storage
};

// Only include redux-logger if we are in development
const loggerMiddleware = process.env.NODE_ENV !== 'production' ? require('redux-logger').default : noopReduxMiddleware;

// We do this to make it easier to switch off redux-persist:
const makeReducer = r => persistCombineReducers(persistConfig, r);

export default () => {
    const enhancer = applyMiddleware(
        thunk
        , loggerMiddleware
    );
    const initialStore = {};
    const reducer = makeReducer(reducers);
    const store = createStore(reducer, initialStore, enhancer);
    // Remove this to turn off redux-persist:
    const persistor = persistStore(store);

    if (module.hot) {
        module.hot.accept('../ducks/index', () => {
            store.replaceReducer(
                makeReducer(require('../ducks/index').default)
            );
        });
    }
    // Only export { store } if not using redux-persist:
    return { store, persistor };
};