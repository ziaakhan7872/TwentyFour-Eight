import {AUTH_LOADING, AUTH_MESSAGE, USER_LOGIN, USER_LOGOUT,SELLER} from './types';

const initialState = {
  authLoading: false,
  authMessage: '',
  token:'',
  seller: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        authLoading: action.payload,
        authMessage: '',
      };
    case AUTH_MESSAGE:
      return {
        ...state,
        authLoading: false,
        authMessage: action.payload,
      };
    case USER_LOGIN:
      return {
        ...state,
        ...action.payload,
        authLoading: false,
      };
    case USER_LOGOUT:
      return {
        ...state,
        token: '',
        seller: false,
      };
      case SELLER:
      return {
        ...state,
        seller: true,
      };
    default:
      return state;
  }
};

export default authReducer;
