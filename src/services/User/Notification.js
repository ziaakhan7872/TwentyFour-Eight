import axios from 'axios';
import {API_URL} from '../Constants';

const Notification = {
  myNotifications: (token) => {
    return axios.get(`${API_URL}/notifications/myNotifations`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
  },
  deleteNotification: (id, token) => {
    return axios.delete(`${API_URL}/notifications/${id}`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
  },
  makeAsRead: (id, token) => {
    // return axios.put(`${API_URL}/notifications/setRead/${id}`, {
    //   headers: {
    //     Authorization: token,
    //     'Content-Type': 'application/json',
    //   },
    // });

    var myHeaders = new Headers();
    myHeaders.append('Authorization', token);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow',
    };

    return fetch(`${API_URL}/notifications/setRead/${id}`, requestOptions);
  },
};

export default Notification;
