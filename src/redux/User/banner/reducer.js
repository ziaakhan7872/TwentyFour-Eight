import {BANNER,BANNER_LOADING} from './types';

const initialState = {
  loading: false,
  banner: {},
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case BANNER_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case BANNER:
      return {
        ...state,
        loading: false,
        banner: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
