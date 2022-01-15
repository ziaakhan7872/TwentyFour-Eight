import {
  CLEAR_RECENT_SEARCHES,
  RECENT_SEARCHES,
  RECOMMENDED,
  SUGGESTION,
  SUGGESTION_ITEMS,
  LOADING,
} from './types';
import Search from '../../../services/User/Search';

export const addSearch = (keyword, token) => async (dispatch) => {
  Search.addSearch(keyword, token)
    .then((res) => res.data)
    .then((res) => {
      if (res.message) {
        dispatch(recentSearches(token));
        dispatch({
          type: LOADING,
          payload: false,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: LOADING,
        payload: false,
      });
      console.log(err);
    });
};

export const recentSearches = (token) => async (dispatch) => {
  Search.recentSearches(token)
    .then((res) => res.data)
    .then((res) => {
      if (res.titles) {
        dispatch({
          type: RECENT_SEARCHES,
          payload: res.titles,
        });
      }
    })
    .catch((err) => {
      if (err.response.status == 400) {
        dispatch({
          type: RECENT_SEARCHES,
          payload: [],
        });
      }
      console.log('recentSearches ERR', err.response);
    });
};

export const clearRecent = (token) => (dispatch) => {
  Search.clearRecent(token)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      dispatch({
        type: CLEAR_RECENT_SEARCHES,
      });
    })
    .catch((err) => {
      console.log('clearRecent', err);
    });
};

export const deleteRecent = (token, title) => (dispatch) => {
  Search.deleteRecent(token, title)
    .then((res) => res.data)
    .then((res) => {
      console.log(res);
      dispatch(recentSearches(token));
    })
    .catch((err) => {
      console.log('clearRecent', err);
    });
};

export const getSuggestions = (token, word) => async (dispatch) => {
  dispatch({
    type: LOADING,
    payload: true,
  });
  Search.getSearchRecommendations(token, word)
    .then((res) => res.data)
    .then((res) => {
      console.log(res);
      let suggestions = res?.map((item, index) => item.name);
      dispatch({
        type: SUGGESTION_ITEMS,
        payload: res,
      });
      dispatch({
        type: SUGGESTION,
        payload: suggestions,
      });
      dispatch({
        type: LOADING,
        payload: false,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOADING,
        payload: false,
      });
      console.log(err);
    });
};

export const getRecommended = (token) => async (dispatch) => {
  Search.getRecommended(token)
    .then((res) => res.data)
    .then((res) => {
      if (res.products) {
        dispatch({
          type: RECOMMENDED,
          payload: res.products,
        });
      }
    })
    .catch((err) => {
      console.log('getRecommended Err',err.response);
    });
};
