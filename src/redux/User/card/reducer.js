import {CARD_LOADING, CARD_MESSAGE, CARD_RESET, CARDS} from './types';

const initialState = {
  cardLoading: false,
  cardMessage: '',
  cards: [],
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case CARD_LOADING:
      return {
        ...state,
        cardLoading: action.payload,
      };
    case CARD_MESSAGE:
      return {
        ...state,
        cardLoading: false,
        cardMessage: action.payload,
      };
    case CARD_RESET:
      return {
        ...state,
        cardLoading: false,
        cardMessage: '',
      };
    case CARDS:
      return {
        ...state,
        cardLoading: false,
        cards: action.payload,
      };
    default:
      return state;
  }
};

export default cardReducer;
