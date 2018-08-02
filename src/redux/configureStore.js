import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import lokkaClientConstructor from 'utils/lokkaClientConstructor';
import { batchedSubscribe } from 'redux-batched-subscribe';
import _debounce from 'lodash/debounce';
import createLogger from 'redux-logger';
import DevTools from './DevTools';

export default function configureStore(initialState) {
  // prepare the logger middleware...
  const loggerMiddleware = createLogger({ level: 'info', collapsed: true });

  // debounce the store...
  const batchedSubscribers = batchedSubscribe(_debounce((notify) => {
    notify();
  }), 100);

  // prepare lokkaClient as extra...
  const { proto, host, endpoint } = initialState.config.graphql;
  const lokkaClient = lokkaClientConstructor(`${proto}://${host}${endpoint}`);
  const thunkExtras = { lokkaClient };

  // define the main store object...
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        thunk.withExtraArgument(thunkExtras),
        loggerMiddleware,
      ),
      DevTools.instrument(),
      batchedSubscribers
    ),
  );

  // implement HMR for reducers...
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default; // eslint-disable-line
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
