import axios from 'axios';
import {API_URL} from '../Constants';

const Business = {
  getCategories: () => {
    return axios.get(`${API_URL}/categories`);
  },
  registerBusiness: (business, token) => {
    let data = {
      name: business.name,
      address: business.address,
      category: business.category,
      sub_category:business.subCategory,
      hours: {
        start: business.start,
        end: business.end,
      },
      email: business.email,
      password: business.password,
      description: business.description,
      phone: business.phone,
      website: business.website,
      image: business.image,
    };
    return axios.post(`${API_URL}/business`, data, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
  },
};
export default Business;
