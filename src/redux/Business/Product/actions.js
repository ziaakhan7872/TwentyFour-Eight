import {
  PRODUCT_LOADING,
  PRODUCT_MESSAGE,
  PRODUCT_RESET,
  PRODUCTS,
} from './types';
import Product from '../../../services/Business/Product';

export const addProduct = (product, token) => async (dispatch) => {
  dispatch({
    type: PRODUCT_LOADING,
    payload: true,
  });
  dispatch({
    type: PRODUCT_MESSAGE,
    payload: '',
  });
  Product.addProduct(product, token)
    .then((res) => res.data)
    .then((res) => {
      dispatch(getProducts(token));
      dispatch({
        type: PRODUCT_LOADING,
        payload: false,
      });
      dispatch({
        type: PRODUCT_MESSAGE,
        payload: res.message,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: PRODUCT_MESSAGE,
        payload: 'Something went wrong',
      });
    });
};

export const editProduct = (newImages, product, token) => async (dispatch) => {
  dispatch({
    type: PRODUCT_LOADING,
    payload: true,
  });
  Product.editProduct(newImages, product, token)
    .then((res) => res.data)
    .then((res) => {
      dispatch(getProducts(token));
      dispatch({
        type: PRODUCT_MESSAGE,
        payload: res.message,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: PRODUCT_MESSAGE,
        payload: 'Something went wrong',
      });
    });
};

export const deleteProduct = (productId, token) => async (dispatch) => {
  dispatch({
    type: PRODUCT_LOADING,
    payload: true,
  });
  Product.deleteProduct(productId, token)
    .then((res) => res.data)
    .then((res) => {
      dispatch(getProducts(token));
      dispatch({
        type: PRODUCT_LOADING,
        payload: false,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: PRODUCT_MESSAGE,
        payload: 'Something went wrong',
      });
    });
};

export const resetProduct = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_RESET,
  });
};

export const getProducts = (token) => async (dispatch) => {
  dispatch({
    type: PRODUCT_LOADING,
    payload: true,
  });
  Product.getProducts(token)
    .then((res) => res.data)
    .then((res) => {
      if (res.message) {
        dispatch({
          type: PRODUCT_LOADING,
          payload: false,
        });
      } else {
        dispatch({
          type: PRODUCTS,
          payload: res,
        });
      }
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: PRODUCT_RESET,
        payload: 'Something went wrong',
      });
    });
};
