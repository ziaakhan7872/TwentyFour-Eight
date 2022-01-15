import {EMPTY_CART} from './types';

const initialState = {
  cart: [],
};

const cartItems = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      // find if it exists, intead of filter
      // if it already exist, do nothing and return state, else push and change state
      const data = state.cart.filter((product) => {
        if (product._id !== action.payload._id) {
          return product;
        }
      });
      let product = action.payload;
      product.quantity = 1;
      return {
        ...state,
        cart: [...data, action.payload],
      };
    }

    case 'INCREMENT_QUANTITY': {
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id === action.payload._id) {
            product.quantity = product.quantity + 1;
          }
          return product;
        }),
      };
    }

    case 'DECREMENT_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id === action.payload._id) {
            if (product.quantity > 1) {
              product.quantity = product.quantity - 1;
            }
          }

          return product;
        }),
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(
          (cartItem) => cartItem._id !== action.payload._id,
        ),
      };

    case EMPTY_CART:
      return {
        ...state,
        cart: [],
      };
  }

  return state;
};

export default cartItems;
