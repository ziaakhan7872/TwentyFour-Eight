import {LOADING,RECENT_SEARCHES,CLEAR_RECENT_SEARCHES,SUGGESTION,SUGGESTION_ITEMS, RECOMMENDED} from './types';

const initialState = {
  loading:false,
  recentSearches:[],
  suggestion:[],
  suggestionItems:[],
  recommended:[]
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading:action.payload,
      };
    case RECENT_SEARCHES:
      return {
        ...state,
        recentSearches:action.payload,
      };
      case CLEAR_RECENT_SEARCHES:
      return {
        ...state,
        recentSearches:[],
      };
      case SUGGESTION:
      return {
        ...state,
        suggestion:action.payload,
      };
      case SUGGESTION_ITEMS:
      return {
        ...state,
        suggestionItems:action.payload,
      };
      case RECOMMENDED:
      return {
        ...state,
        recommended:action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
