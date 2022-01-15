import axios from 'axios';
import {API_URL} from '../Constants';

const Review = {
  addReview: (token, review) => {
    return axios.post(`${API_URL}/reviews`, review, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
  },
  getReviewOfProduct: (id) => {
    return axios.get(`${API_URL}/reviews/productReviews/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};

export default Review;
