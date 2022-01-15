import axios from 'axios';
import {API_URL} from '../Constants';
import File from '../Files/File';

const Auth = {
  loginUser: (email, password) => {
    let data = {
      email: email,
      password: password,
    };

    return axios.post(`${API_URL}/auth/login`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  registerUser: async (name, email, password, image) => {
    const remoteUri = await File.uploadFiles(image);
    let data = {
      name: name,
      email: email,
      password: password,
      profile_image: remoteUri,
    };
    return axios.post(`${API_URL}/users/register`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  forgotPassword: (email) => {
    let data = {
      email: email,
    };

    return axios.post(`${API_URL}/users/recoverPassword`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  socialLogin: (socialInfo) => {
    console.log(socialInfo);
    let data = {
      email: socialInfo.email,
      firstName: socialInfo.firstName,
      lastName: socialInfo.lastName,
      imageUrl: socialInfo.imageUrl,
      id: socialInfo.id,
    };

    return axios.post(`${API_URL}/auth/social-login`, data, {
      headers: {
        secretKey: '24_8_secure_key',
        'Content-Type': 'application/json',
      },
    });
  },
};

export default Auth;
