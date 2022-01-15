import {PRODUCT_LOADING,PRODUCT_MESSAGE,PRODUCT_RESET,PRODUCTS} from './types';

const initialState = {
  productLoading: false,
  productMessage:'',
  products:[]
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LOADING:
      return {
        ...state,
        productLoading: action.payload,
      };
      case PRODUCT_MESSAGE:
      return {
        ...state,
        productMessage: action.payload,
      };
      case PRODUCT_RESET:
        return {
          ...state,
          productLoading: false,
          productMessage: '',
        };
        case PRODUCTS:
        return {
          ...state,
          productLoading: false,
          products: action.payload,
        };
    default:
      return state;
  }
};

export default productReducer;
