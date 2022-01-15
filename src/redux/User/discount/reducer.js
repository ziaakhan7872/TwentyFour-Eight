import {PLAN,LOADING,CODE} from './types';

const initialState = {
  loading: false,
  plan: {},
  discount:0
};

const discountReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case PLAN:
      return {
        ...state,
        plan: action.payload,
        loading: false,
      };
      case CODE:
      return {
        ...state,
        discount: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default discountReducer;
