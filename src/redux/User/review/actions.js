import {LOADING, REVIEWS, ADD_REVIEW} from './types';
import Review from '../../../services/User/Review';
import {ToastAndroid} from 'react-native';

export const addReview = (token, review) => (dispatch) => {
  dispatch({
    type: LOADING,
    payload: true,
  });
  Review.addReview(token, review)
    .then((res) => res.data)
    .then((res) => {
      ToastAndroid.show(res.message, 1000);
      dispatch(getReviews(review.product));
      dispatch({
        type: LOADING,
        payload: false,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getReviews = (id) => (dispatch) => {
  console.log('GETTING REVIEWS');
  dispatch({
    type: LOADING,
    payload: true,
  });
  Review.getReviewOfProduct(id)
    .then((res) => res.data)
    .then((res) => {
      if (res) {
        dispatch({
          type: REVIEWS,
          payload: res,
        });
      }
    })
    .catch((err) => {
      if (err.response.status == 400) {
        dispatch({
          type: REVIEWS,
          payload: [],
        });
      }
    });
};
