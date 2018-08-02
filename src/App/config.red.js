import _get from 'lodash/get';
import { CONFIG_SET } from 'redux/actionTypes';

export const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONFIG_SET:
      return {
        ...state,
        ...action.config,
      };

    default:
      return state;
  }
};

const build = state => _get(state, 'build', {});

export const selectors = {
  build,
};
