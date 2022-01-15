import {BUSINESS_LOADING, BUSINESS_MESSAGE, CATEGORIES, IS_SELLER} from './types';
import {SELLER} from '../../User/auth/types';
import Business from '../../../services/Business/Register';

export const registerBusiness = (business, token) => async (dispatch) => {
  dispatch({
    type: BUSINESS_LOADING,
    payload: true,
  });
  Business.registerBusiness(business, token)
    .then((res) => res.data)
    .then((res) => {
      console.log(res)
      dispatch({
        type: BUSINESS_MESSAGE,
        payload: res.message,
      });
      if(res.business){
        dispatch({
          type: IS_SELLER,
        });
        dispatch({
          type: SELLER,
        });
      }
    })
    .catch((err) => {
      if(err.response.status == 400){
        console.log(err.response.data)
        dispatch({
          type: BUSINESS_MESSAGE,
          payload: err.response.data,
        });
      }else{
      dispatch({
        type: BUSINESS_MESSAGE,
        payload: 'Something went wrong',
      });
    }
    });
};

export const getCategories = () => async (dispatch) => {
  dispatch({
    type:BUSINESS_LOADING,
    payload:true
  })
  Business.getCategories()
    .then((res) => res.data)
    .then((res) => {
      dispatch({
        type: CATEGORIES,
        payload: res,
      });
    })
    .catch((err) => {
      console.log('Categories Error===>', err);
    });
};
