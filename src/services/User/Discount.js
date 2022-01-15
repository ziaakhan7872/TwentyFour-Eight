import axios from 'axios';
import {API_URL} from '../Constants';

const Discount = {
  checkAvailability: (code, token) => {
    let data = {
      code: code,
    };
    return axios.post(`${API_URL}/vouchers/check-available`, data, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
  },
  redeem: (code, token) => {
    let data = {
      code: code,
    };
    return axios.post(`${API_URL}/vouchers/redeem`, data, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
  },
  getPlan: (token) => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', token);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };

    return fetch(`${API_URL}/users/get-plan`, requestOptions);
  },
  setPlan: (plan, token) => {
    let data = {
      plan: plan,
    };
    return axios.post(`${API_URL}/users/set-plan`, data, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
  },
};

export default Discount;
