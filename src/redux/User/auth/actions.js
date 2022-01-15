import {AUTH_LOADING, AUTH_MESSAGE, USER_LOGIN, USER_LOGOUT} from './types';
import Auth from '../../../services/User/Auth';
import {getProfile} from '../../../redux/User/profile/actions';
export const resetAuth = () => async (dispatch) => {
  dispatch({
    type: AUTH_LOADING,
    payload: false,
  });
};
export const loginUser = (email, password) => async (dispatch) => {
  dispatch({
    type: AUTH_LOADING,
    payload: true,
  });
  Auth.loginUser(email, password)
    .then((res) => res.data)
    .then((res) => {
      if (res.token) {
        dispatch(getProfile(res.token));
        dispatch({
          type: USER_LOGIN,
          payload: res,
        });
      }
    })
    .catch((err) => {
      console.log('error on userLogin-->', err.response.data);
      dispatch({
        type: AUTH_MESSAGE,
        payload: err.response.data,
      });
    });
};
export const registerUser = (name, email, password, image) => async (
  dispatch,
) => {
  dispatch({
    type: AUTH_LOADING,
    payload: true,
  });
  Auth.registerUser(name, email, password, image)
    .then((res) => res.data)
    .then((res) => {
      if (res.token) {
        dispatch({
          type: AUTH_MESSAGE,
          payload: 'Account created successfully!',
        });
      }
    })
    .catch((err) => {
      if (err.response.status == 400) {
        console.log(err.response);
        dispatch({
          type: AUTH_MESSAGE,
          payload: 'Account already exists!',
        });
      } else {
        console.log('error on registerUser-->', err.response.data.msg);
        dispatch({
          type: AUTH_MESSAGE,
          payload: err.response.data.msg,
        });
      }
    });
};
export const logoutUser = () => async (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });
};
export const forgotPassword = (email) => async (dispatch) => {
  dispatch({
    type: AUTH_LOADING,
    payload: true,
  });
  Auth.forgotPassword(email)
    .then((res) => res.data)
    .then((res) => {
      dispatch({
        type: AUTH_MESSAGE,
        payload: 'Reset Password link has been sent to the email',
      });
    })
    .catch((err) => {
      console.log('error on forgotPassword-->', err.response.data.message);
      dispatch({
        type: AUTH_MESSAGE,
        payload: err.response.data.message,
      });
    });
};

export const socialLogin = (socialInfo) => async (dispatch) => {
  Auth.socialLogin(socialInfo)
    .then((res) => res.data)
    .then((res) => {
      console.log(res);
      if (res.token) {
        dispatch(getProfile(res.token));
        dispatch({
          type: USER_LOGIN,
          payload: res,
        });
      }
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: AUTH_MESSAGE,
        payload: 'Something went wrong',
      });
    });
};
