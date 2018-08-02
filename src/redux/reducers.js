import { combineReducers } from 'redux';
import config, * as fromConfig from 'App/config.red';
import lokka, * as fromLokka from 'utils/lokka.red';

export const reducers = {
  config,
  lokka,
};

export default combineReducers(reducers);

export const exportSelectors = (reducerName, from) => ({
  // overload the first argument of the selectors with the state of
  // the specific reducer...
  // create a new overloaded arguments array...
  // apply the new arguments to the selector function...
  ...from,
  ...Object.keys(from.selectors || {}).reduce((context, s) => ({
    ...context,
    [s]: (state, ...args) => from.selectors[s].apply(null, [state[reducerName], ...args]),
  }), {}),
});

export const select = {
  ...exportSelectors('config', fromConfig),
  ...exportSelectors('lokka', fromLokka),
};
