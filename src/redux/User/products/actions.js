import {
  ALL,
  POPULAR,
  DISCOUNTED,
  EXCLUSIVE,
  RECOMMENDED,
  CATEGORY,
  LOADING,
} from './types';
import Products from '../../../services/User/Products';

export const allProducts = () => async (dispatch) => {
  dispatch({
    type: LOADING,
    payload: true,
  });
  Products.allProducts()
    .then((res) => res.data)
    .then((res) => {
      if (res) {
        dispatch({
          type: ALL,
          payload: res,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const popularProducts = () => async (dispatch) => {
  dispatch({
    type: LOADING,
    payload: true,
  });
  Products.popularProducts()
    .then((res) => res.data)
    .then((res) => {
      if (res) {
        dispatch({
          type: POPULAR,
          payload: res,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const discountedProducts = () => async (dispatch) => {
  dispatch({
    type: LOADING,
    payload: true,
  });
  Products.discountedProducts()
    .then((res) => res.data)
    .then((res) => {
      if (res) {
        dispatch({
          type: DISCOUNTED,
          payload: res,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const exclusiveProducts = () => async (dispatch) => {
  dispatch({
    type: LOADING,
    payload: true,
  });
  Products.exclusiveProducts()
    .then((res) => res.data)
    .then((res) => {
      if (res) {
        dispatch({
          type: EXCLUSIVE,
          payload: res,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getAllProductsOfSubcategory = (category) => async (dispatch) => {
  dispatch({
    type: LOADING,
    payload: true,
  });
  Products.getAllProductsOfSubcategory(category)
    .then((res) => res.data)
    .then((res) => {
      if (res) {
        dispatch({
          type: CATEGORY,
          payload: res,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
