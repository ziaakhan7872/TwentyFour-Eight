import {ALL,POPULAR,DISCOUNTED,EXCLUSIVE,RECOMMENDED,CATEGORY,LOADING} from './types';

const initialState = {
  loading:false,
  all:[],
  popular:[],
  discounted:[],
  exclusive:[],
  recommended:[],
  category:[]
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading:action.payload,
      };
      case ALL:
      return {
        ...state,
        all:action.payload,
        loading:false
      };
    case POPULAR:
      return {
        ...state,
        popular:action.payload,
        loading:false
      };
      case DISCOUNTED:
      return {
        ...state,
        discounted:action.payload,
        loading:false
      };

      case EXCLUSIVE:
      return {
        ...state,
        exclusive:action.payload,
        loading:false
      };
      case RECOMMENDED:
      return {
        ...state,
        recommended:action.payload,
        loading:false
      };
      case CATEGORY:
      return {
        ...state,
        category:action.payload,
        loading:false
      };
    default:
      return state;
  }
};

export default wishlistReducer;
