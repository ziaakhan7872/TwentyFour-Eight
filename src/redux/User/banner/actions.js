import {BANNER, BANNER_LOADING} from './types';
import Banner from '../../../services/User/Banner';

export const getBanners = () => async (dispatch) => {
  dispatch({
    type: BANNER_LOADING,
    payload: true,
  });
  Banner.getBanner()
    .then((res) => res.data)
    .then((res) => {
     dispatch({
       type:BANNER,
       payload:res
     })
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: BANNER_LOADING,
        payload: false,
      });
    });
};
