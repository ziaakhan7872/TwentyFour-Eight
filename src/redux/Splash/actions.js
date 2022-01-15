import {
  SPLASH
} from './types';

export const appLaunched = () => async (dispatch) => {
  dispatch({
    type:SPLASH,
    payload:false
  });
};