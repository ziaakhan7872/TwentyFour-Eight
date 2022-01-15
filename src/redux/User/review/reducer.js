import {LOADING, REVIEWS} from './types';

const initialState = {
  loading: false,
  reviews: [],
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case REVIEWS:
      return {
        ...state,
        reviews: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default reviewReducer;
