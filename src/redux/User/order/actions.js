import {ORDERS, ORDER_LOADING, ORDER_MESSAGE, ORDER_RESET} from './types';
import {EMPTY_CART} from '../cart/types'
import Order from '../../../services/User/Order';

export const getOrders = (token) => async (dispatch) => {
  console.log(token)
  dispatch({
    type: ORDER_LOADING,
    payload: true,
  });
  Order.getOrders(token)
    .then((res) => res.data)
    .then((res) => {
      if(res.message){
        dispatch({
          type: ORDER_LOADING,
          payload: false,
        });
      }else{
        dispatch({
          type: ORDERS,
          payload: res.orders,
        });
      }
      
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: ORDER_RESET,
        payload: 'Something went wrong',
      });
    });
};

export const newOrder = (token, order) => async (dispatch) => {
  console.log(token)
  dispatch({
    type: ORDER_LOADING,
    payload: true,
  });
  Order.newOrder(token, order)
    .then((res) => res.data)
    .then((res) => {
      alert(res.message);
      dispatch({
        type: ORDER_LOADING,
        payload: false,
      });
      dispatch({
        type: EMPTY_CART
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: ORDER_RESET,
        payload: 'Something went wrong',
      });
    });
};
// export const saveCard = (card, token) => async (dispatch) => {
//   dispatch({
//     type: CARD_LOADING,
//     payload: true,
//   });
//   Card.saveCard(card, token)
//     .then((res) => res.data)
//     .then((res) => {
//       dispatch({
//         type: CARD_MESSAGE,
//         payload: res.message,
//       });
//     })
//     .catch((err) => {
//       console.log(err.response);
//       dispatch({
//         type: CARD_MESSAGE,
//         payload: 'Something went wrong',
//       });
//     });
// };

// export const updateCard = (card, token) => async (dispatch) => {
//   dispatch({
//     type: CARD_LOADING,
//     payload: true,
//   });
//   Card.updateCard(card, token)
//     .then((res) => res.data)
//     .then((res) => {
//       dispatch({
//         type: CARD_MESSAGE,
//         payload: res.message,
//       });
//     })
//     .catch((err) => {
//       console.log(err.response);
//       dispatch({
//         type: CARD_MESSAGE,
//         payload: 'Something went wrong',
//       });
//     });
// };

// export const deleteCard = (cardId, token) => async (dispatch) => {
//   dispatch({
//     type: CARD_LOADING,
//     payload: true,
//   });
//   Card.deleteCard(cardId, token)
//     .then((res) => res.data)
//     .then((res) => {
//       dispatch({
//         type: CARD_LOADING,
//         payload: false,
//       });
//     })
//     .catch((err) => {
//       console.log(err.response);
//       dispatch({
//         type: CARD_MESSAGE,
//         payload: 'Something went wrong',
//       });
//     });
// };

// export const resetCard = () => async (dispatch) => {
//   dispatch({
//     type: CARD_RESET,
//   });
// };

// export const myCards = (token) => async (dispatch) => {
//   dispatch({
//     type: CARD_LOADING,
//     payload: true,
//   });
//   Card.myCards(token)
//     .then((res) => res.data)
//     .then((res) => {
//       dispatch({
//         type: CARDS,
//         payload: res,
//       });
//     })
//     .catch((err) => {
//       console.log(err.response);
//       dispatch({
//         type: CARD_RESET,
//         payload: 'Something went wrong',
//       });
//     });
// };
