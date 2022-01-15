import {MY_WISHLIST, LOADING, IS_FAV} from './types';
import Wishlist from '../../../services/User/Wishlist';

export const addToWishlist = (productId, token) => async (dispatch) => {
  Wishlist.addToWishlist(productId, token)
    .then((res) => res.data)
    .then((res) => {
      dispatch(checkInWishlist(productId, token));
      console.log(res);
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const removeFromWishlist = (productId, token) => async (dispatch) => {
  Wishlist.removeFromWishlist(productId, token)
    .then((res) => res.data)
    .then((res) => {
      dispatch(checkInWishlist(productId, token));
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const checkInWishlist = (productId, token) => (dispatch) => {
  Wishlist.checkInWishlist(productId, token)
    .then((res) => res.data)
    .then((res) => {
      dispatch({
        type: IS_FAV,
        payload: res.status,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const myWishList = (token) => async (dispatch) => {
  dispatch({
    type: LOADING,
    payload: true,
  });
  Wishlist.myWishlist(token)
    .then((res) => res.data)
    .then((res) => {
      if (res.message) {
        dispatch({
          type: LOADING,
          payload: false,
        });
      } else {
        dispatch({
          type: MY_WISHLIST,
          payload: res,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
