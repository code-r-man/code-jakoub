import {
  LOKKA_SUCCESS,
  LOKKA_ERROR,
  LOKKA_REQUEST,
  LOKKA_QUERY,
} from 'redux/actionTypes';

export const initialState = {};

export default (state = {}, action) => {
  switch (action.type) {
    case LOKKA_SUCCESS: {
      const ref = action.query.name;
      return {
        ...state,
        [ref]: {
          ...state[ref],
          loading: false,
          data: action.result[action.query.read],
        },
      };
    }
    case LOKKA_ERROR: {
      const ref = action.query.name;
      return {
        ...state,
        [ref]: {
          ...state[ref],
          loading: false,
          error: action.errorMessage,
        },
      };
    }
    case LOKKA_REQUEST: {
      const ref = action.query.name;
      return {
        ...state,
        [ref]: {
          ...state[ref],
          loading: true,
        },
      };
    }
    case LOKKA_QUERY:
    default:
      return state;
  }
};


export const selectors = {};
