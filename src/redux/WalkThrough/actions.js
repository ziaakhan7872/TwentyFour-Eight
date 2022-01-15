import {
  FIRST_LAUNCH
} from './types';

export const launched = () => async (dispatch) => {
  dispatch({
    type:FIRST_LAUNCH,
    payload:false
  });
};