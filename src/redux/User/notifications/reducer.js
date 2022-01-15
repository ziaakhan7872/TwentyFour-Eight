import {LOADING, NOTIFICATIONS, UNREAD_NOTIFICATIONS} from './types';

const initialState = {
  loading: false,
  notifications: [],
  unreadNotifications: [],
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
        loading: false,
      };
    case UNREAD_NOTIFICATIONS:
      return {
        ...state,
        unreadNotifications: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default wishlistReducer;
