import {
  PROFILE_LOADING,
  PROFILE_RESET,
  PROFILE_MESSAGE,
  PROFILE,
  ADDRESS,
  SETTINGS,
} from './types';
import Profile from '../../../services/User/Profile';
import {ToastAndroid} from 'react-native';

export const getAddress = (token) => async (dispatch) => {
  dispatch({
    type: PROFILE_LOADING,
    payload: true,
  });
  Profile.getAddress(token)
    .then((res) => res.data)
    .then((res) => {
      dispatch({
        type: ADDRESS,
        payload: res.shipping_address,
      });
    })
    .catch((err) => {
      console.log('ERR', err.response);
    });
};

export const setAddress = (address, token) => (dispatch) => {
  dispatch({
    type: PROFILE_LOADING,
    payload: true,
  });
  Profile.setAddress(address, token)
    .then((res) => res.data)
    .then((res) => {
      if (res) {
        dispatch(getProfile(token));
        ToastAndroid.show('Saved!', 1000);
        dispatch({
          type: PROFILE_LOADING,
          payload: false,
        });
      }
    })
    .catch((err) => {
      console.log('ERR', err.response);
    });
};

export const getProfile = (token) => async (dispatch) => {
  dispatch({
    type: PROFILE_LOADING,
    payload: true,
  });
  Profile.getProfile(token)
    .then((res) => res.json())
    .then((res) => {
      if (res.user) {
      }
      dispatch({
        type: PROFILE,
        payload: res.user,
      });
    })
    .catch((err) => {
      console.log('ERR', err.response);
    });
};

export const updateProfile = (token, profile) => (dispatch) => {
  console.log('update');
  dispatch({
    type: PROFILE_LOADING,
    payload: true,
  });
  Profile.updateProfile(token, profile)
    .then((res) => res.data)
    .then((res) => {
      if (res) {
        dispatch({
          type: PROFILE,
          payload: res.user,
        });
      }
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: PROFILE_LOADING,
        payload: false,
      });
    });
};

export const updateSettings = (setting, token) => async (dispatch) => {
  dispatch({
    type: PROFILE_LOADING,
    payload: true,
  });
  Profile.updateSettings(setting, token)
    .then((res) => res.data)
    .then((res) => {
      if (res) {
        setTimeout(() => {
          dispatch({
            type: PROFILE_LOADING,
            payload: false,
          });
          ToastAndroid.show('Settings Updated!', 1000);
        }, 2000);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getSettings = (token) => async (dispatch) => {
  Profile.getSettings(token)
    .then((res) => res.data)
    .then((res) => {
      if (res) {
        dispatch({
          type: SETTINGS,
          payload: res.setting,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const sendMessageToSupport = (supportMessage, token) => async (
  dispatch,
) => {
  dispatch({
    type: PROFILE_LOADING,
    payload: true,
  });
  Profile.sendMessageToSupport(supportMessage, token)
    .then((res) => res.data)
    .then((res) => {
      console.log(res);
      if (res) {
        dispatch({
          type: PROFILE_LOADING,
          payload: false,
        });
        ToastAndroid.show('Saved', 1000);
      }
    })
    .catch((err) => {
      console.log('ERR', err.response);
      dispatch({
        type: PROFILE_LOADING,
        payload: false,
      });
    });
};

export const profileReset = () => async (dispatch) => {
  dispatch({
    type: PROFILE_RESET,
  });
};
