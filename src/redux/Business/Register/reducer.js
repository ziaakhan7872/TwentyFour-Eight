import {BUSINESS_LOADING,BUSINESS_MESSAGE, CATEGORIES, IS_SELLER} from './types';

const initialState = {
  businessLoading: false,
  businessMessage:'',
  categories: [],
  isSeller:false
};

const businessReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUSINESS_LOADING:
      return {
        ...state,
        businessLoading: action.payload,
      };
      case BUSINESS_MESSAGE:
      return {
        ...state,
        businessLoading: false,
        businessMessage: action.payload,
      };
      case IS_SELLER:
      return {
        ...state,
        businessLoading: false,
        businessMessage:'',
        isSeller:true
      };
    case CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        businessLoading: false,
      };
    default:
      return state;
  }
};

export default businessReducer;
