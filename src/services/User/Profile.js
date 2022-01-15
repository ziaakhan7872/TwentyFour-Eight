import axios from 'axios';
import {API_URL} from '../Constants';
import File from '../Files/File';

const Profile = {
  getAddress: (token) => {
    return axios.get(`${API_URL}/ship-address`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
  },
  setAddress: (address, token) => {
    let data = {
      shipping_address: {
        House: address.House,
        Street: address.Street,
        City: address.City,
        State: address.State,
        Country: address.Country,
      },
    };
    return axios.post(`${API_URL}/ship-address`, data, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
  },
  getProfile: (token) => {
    // return axios.post(`${API_URL}/users/me`, {
    //   headers: {
    //     Authorization: token,
    //     'Content-Type': 'application/json',
    //   },
    // });

    var myHeaders = new Headers();
    myHeaders.append('Authorization', token);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };

    return fetch(`${API_URL}/users/me`, requestOptions);
  },
  updateProfile: async (token, profile) => {
    const remoteUri = await File.uploadFiles({
      uri: profile.image,
      fileName: profile.image,
    });
    let data = {
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
     // address: profile.address,
      image: remoteUri,
    };
    return axios.post(`${API_URL}/users/edit-profile`, data, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
  },
  updateSettings: (setting, token) => {
    console.log(setting);
    let data = {
      notifications: setting.notifications,
      pop_ups: setting.popup,
      order_history: setting.history,
    };
    return axios.put(`${API_URL}/setting`, data, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
  },
  getSettings: (token) => {
    return axios.get(`${API_URL}/setting`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
  },
  sendMessageToSupport: (supportMessage, token) => {
    console.log(supportMessage, token);

    return axios.post(`${API_URL}/support`, supportMessage, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
  },
};

export default Profile;
