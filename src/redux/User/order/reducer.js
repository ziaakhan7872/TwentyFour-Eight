import {ORDER_LOADING, ORDER_MESSAGE, ORDER_RESET, ORDERS} from './types';

const initialState = {
  orderLoading: false,
  orderMessage: '',
  orders: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_LOADING:
      return {
        ...state,
        orderLoading: action.payload,
      };
    case ORDER_MESSAGE:
      return {
        ...state,
        orderLoading: false,
        orderMessage: action.payload,
      };
    case ORDER_RESET:
      return {
        ...state,
        orderLoading: false,
        orderMessage: '',
      };
    case ORDERS:
      return {
        ...state,
        orderLoading: false,
        orders: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
