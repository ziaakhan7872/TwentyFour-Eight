import axios from 'axios';
import {API_URL} from '../Constants';

const Search = {
  addSearch: (keyword, token) => {
    let data = {
      title: keyword,
    };
    return axios.put(`${API_URL}/search/addSearch`, data, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
  },
  recentSearches: (token) => {
    return axios.get(`${API_URL}/search/recentSearch`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
  },
  clearRecent: (token) => {
    // return axios.post(`${API_URL}/search/removehistory`, {
    //   headers: {
    //     Authorization: token,
    //     'Content-Type': 'application/json',
    //   },
    // });
    var myHeaders = new Headers();
    myHeaders.append('Authorization', token);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };

    return fetch(`${API_URL}/search/removehistory`, requestOptions);
  },

  deleteRecent: (token, title) => {
    return axios.post(`${API_URL}/search/removeSearch`, title, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
  },
  getSearchRecommendations: (token, word) => {
    return axios.get(`${API_URL}/products/autoComplete/${word}`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
  },
  getRecommended: (token) => {
    console.log(token);
    return axios.get(`${API_URL}/products/recommendations`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
  },
};

export default Search;
