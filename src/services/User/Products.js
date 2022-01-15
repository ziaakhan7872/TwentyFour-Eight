import axios from 'axios';
import {API_URL} from '../Constants';

const Products = {
  allProducts: () => {
    return axios.get(`${API_URL}/products`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  popularProducts: () => {
    return axios.get(`${API_URL}/products/popularProducts`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  discountedProducts: () => {
    return axios.get(`${API_URL}/products/discountedProducts`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  exclusiveProducts: () => {
    return axios.get(`${API_URL}/products/exclusiveProducts`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  getAllProductsOfSubcategory: (category) => {
    return axios.get(`${API_URL}/products/category/${category}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};

export default Products;
