import {IS_FAV, LOADING, MY_WISHLIST} from './types';

const initialState = {
  loading: false,
  wishlist: [],
  isFav:false
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case MY_WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
        loading: false,
      };
      case IS_FAV:
        return {
          ...state,
          isFav: action.payload,
        };
    default:
      return state;
  }
};

export default wishlistReducer;
