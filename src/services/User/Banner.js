import {API_URL} from '../Constants';
import axios from 'axios';
const Banner = {
  getBanner: () => {
    return axios.get(`${API_URL}/ads/getRandomAd`);
  },
};

export default Banner;
