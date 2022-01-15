import axios from 'axios';
import {API_URL} from '../Constants';

const Order = {
  getOrders: (token) => {
    return axios.get(`${API_URL}/orders/myOrders`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
  },
  getOrderHistory: (token) => {
    return axios.get(`${API_URL}/orders/myOrders`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
  },
  newOrder: (token,order) => {
    console.log(order)
    let data = {
      delivery_type: order.deliveryType,
      amount: order.totalPrice,
      discount: order.totalDiscount,
      shipping_address: order.address,
      products: order.products,
      sub_total: order.subTotal,
    };
    return axios.post(`${API_URL}/orders`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
  },
};

export default Order;
