import {NOTIFICATIONS, LOADING, UNREAD_NOTIFICATIONS} from './types';
import Notification from '../../../services/User/Notification';

export const myNotifications = (token) => async (dispatch) => {
  dispatch({
    type: LOADING,
    payload: false,
  });
  Notification.myNotifications(token)
    .then((res) => res.data)
    .then(async (res) => {
      if (res.message) {
        dispatch({
          type: LOADING,
          payload: false,
        });
      } else {
        dispatch({
          type: NOTIFICATIONS,
          payload: res,
        });
        let data = await res.filter((item) => {
          return !item.is_read;
        });

        dispatch({
          type: UNREAD_NOTIFICATIONS,
          payload: data,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
export const deleteNotification = (id, token) => async (dispatch) => {
  Notification.deleteNotification(id, token)
    .then((res) => res.data)
    .then((res) => {
      dispatch(myNotifications(token));
    })
    .catch((err) => {
      console.log(err);
    });
};
export const makeAsRead = (id, token) => (dispatch) => {
  Notification.makeAsRead(id, token)
    .then((res) => res.json())
    .then((res) => {
      dispatch(myNotifications(token));
    })
    .catch((err) => {
      console.log(err.response);
    });
};
