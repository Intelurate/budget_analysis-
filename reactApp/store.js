//require('es6-object-assign').polyfill();
require('es6-promise').polyfill();

import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory, hashHistory, useRouterHistory } from 'react-router';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';

// import the root reducer & default state
import rootReducer from './reducers/index';

// initial states used to set up store object
import budgetInitialState from './initialState/budgetInitialState';

// add new initial state to defaultState when creating new initialstate 

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// useRouterHistory creates a composable higher-order function
const appHistory = useRouterHistory(createHashHistory)();

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export const history = syncHistoryWithStore(appHistory, store);

// const store = createStore(rootReducer, defaultState, composeEnhancers(applyMiddleware(thunk)));
// export const history = syncHistoryWithStore(hashHistory, store);

if (module.hot) {
    module.hot.accept('./reducers/', () => {
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    });
}

export default store;
