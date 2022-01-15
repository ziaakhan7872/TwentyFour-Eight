import {CARD_LOADING, CARD_MESSAGE, CARD_RESET, CARDS} from './types';
import Card from '../../../services/User/Card';

export const saveCard = (card, token) => async (dispatch) => {
  dispatch({
    type: CARD_LOADING,
    payload: true,
  });
  Card.saveCard(card, token)
    .then((res) => res.data)
    .then((res) => {
      console.log(res)
      dispatch({
        type: CARD_MESSAGE,
        payload: res.message,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: CARD_MESSAGE,
        payload: 'Something went wrong',
      });
    });
};

export const updateCard = (card, token) => async (dispatch) => {
  dispatch({
    type: CARD_LOADING,
    payload: true,
  });
  Card.updateCard(card, token)
    .then((res) => res.data)
    .then((res) => {
      dispatch({
        type: CARD_MESSAGE,
        payload: res.message,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: CARD_MESSAGE,
        payload: 'Something went wrong',
      });
    });
};

export const deleteCard = (cardId, token) => async (dispatch) => {
  dispatch({
    type: CARD_LOADING,
    payload: true,
  });
  Card.deleteCard(cardId, token)
    .then((res) => res.data)
    .then((res) => {
      console.log(res)
      dispatch(myCards(token));
      dispatch({
        type: CARD_LOADING,
        payload: false,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: CARD_MESSAGE,
        payload: 'Something went wrong',
      });
    });
};

export const resetCard = () => async (dispatch) => {
  dispatch({
    type: CARD_RESET,
  });
};

export const myCards = (token) => async (dispatch) => {
  dispatch({
    type: CARD_LOADING,
    payload: true,
  });
  Card.myCards(token)
    .then((res) => res.data)
    .then((res) => {
      if (res.message) {
        dispatch({
          type: CARD_LOADING,
          payload: false,
        });
      } else {
        dispatch({
          type: CARDS,
          payload: res,
        });
      }
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: CARD_RESET,
        payload: 'Something went wrong',
      });
    });
};
