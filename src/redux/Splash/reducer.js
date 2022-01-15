import {SPLASH} from './types';

const initialState = {
  splash: true,
};

const splashReducer = (state = initialState, action) => {
  switch (action.type) {
    case SPLASH:
      return {
        ...state,
        splash: action.payload,
      };
    default:
      return state;
  }
};

export default splashReducer;
