import {LOADING, PLAN, CODE} from './types';
import Discount from '../../../services/User/Discount';
import {ToastAndroid} from 'react-native';

export const checkAvailability = (code, token) => (dispatch) => {
  dispatch({
    type: LOADING,
    payload: true,
  });
  Discount.checkAvailability(code, token)
    .then((res) => res.data)
    .then((res) => {
      if (res.voucher.available) {
        dispatch({
          type: CODE,
          payload: res.voucher.discount,
        });
      } else {
        dispatch({
          type: CODE,
          payload: 0,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: LOADING,
        payload: false,
      });
      ToastAndroid.show('Invalid', 500);
    });
};
export const resetDiscount = () => (dispatch) => {
  dispatch({
    type: CODE,
    payload: 0,
  });
};

export const redeem = (code, token) => (dispatch) => {
  Discount.redeem(code, token)
    .then((res) => res.data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      if (err.response.status == 400) {
        console.log('Voucher Not Found');
      }
    });
};

export const getPlan = (token) => (dispatch) => {
  Discount.getPlan(token)
    .then((res) => res.json())
    .then((res) => {
      if (res) {
        dispatch({
          type: PLAN,
          payload: res,
        });
      }
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const setPlan = (plan, token) => (dispatch) => {
  Discount.setPlan(plan, token)
    .then((res) => res.data)
    .then((res) => {
      dispatch(getPlan(token))
      alert(res.message);
    })
    .catch((err) => {
      console.log(err);
    });
};
