import axios from 'axios';
import {API_URL} from '../Constants';

const Wishlist = {
  removeFromWishlist: (productId, token) => {
    let data = {
      product: productId,
    };
    return axios.put(`${API_URL}/wishlist/removeFromWishlist`, data, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
  },
  addToWishlist: (productId, token) => {
    let data = {
      product: productId,
    };
    return axios.put(`${API_URL}/wishlist/addToWishlist`, data, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
  },
  myWishlist: (token) => {
    return axios.get(`${API_URL}/wishlist/myWishList`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
  },
  checkInWishlist: (productId,token) => {
    let data = {
        product: productId,
      };
    return axios.post(`${API_URL}/wishlist/check-in-wishlist`,data, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
  },
};

export default Wishlist;
