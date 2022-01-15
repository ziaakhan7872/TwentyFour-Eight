import {FIRST_LAUNCH} from './types';

const initialState = {
  firstLaunch: true,
};

const walkThroughReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIRST_LAUNCH:
      return {
        ...state,
        firstLaunch: action.payload,
      };
    default:
      return state;
  }
};

export default walkThroughReducer;
