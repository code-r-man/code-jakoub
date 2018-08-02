import { Router, browserHistory } from 'react-router';
import routes from 'config/routes';
import { render } from 'react-dom';
import configureStore from 'redux/configureStore';
import React from 'react';
import { Provider } from 'react-redux';
import DevTools from 'redux/DevTools';


// grab the state from a global injected into server-generated HTML...
const initialState = window.__INITIAL_STATE__; //eslint-disable-line
const store = configureStore(initialState, true);

// start the application...
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
);

// start DevTools...
render(
  <Provider store={store}>
    <DevTools />
  </Provider>,
  document.getElementById('devtools')
);
