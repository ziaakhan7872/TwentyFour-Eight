import {
  PROFILE_LOADING,
  PROFILE_RESET,
  PROFILE_MESSAGE,
  PROFILE,
  ADDRESS,
  SETTINGS
} from './types';

const initialState = {
  profileLoading: false,
  profileMessage: '',
  profile: {},
  address:{},
  settings:{}
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        profileLoading: action.payload,
      };
    case PROFILE_RESET:
      return {
        ...state,
        profileLoading: false,
        profileMessage: '',
      };
    case PROFILE_MESSAGE:
      return {
        ...state,
        profileLoading: false,
        profileMessage: action.payload,
      };
    case PROFILE:
      return {
        ...state,
        profileLoading: false,
        profileMessage: '',
        profile: action.payload,
      };
      case ADDRESS:
      return {
        ...state,
        profileLoading: false,
        profileMessage: '',
        address: action.payload,
      };
      case SETTINGS:
        return {
          ...state,
          settings: action.payload,
        };
    default:
      return state;
  }
};

export default profileReducer;
