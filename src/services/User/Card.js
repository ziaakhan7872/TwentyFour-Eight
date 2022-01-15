import axios from 'axios';
import {API_URL} from '../Constants';

const Card = {
  saveCard: (card, token) => {
    let data = {
      name_on_card: card.name,
      card_number: card.number,
      expiry_date: {
        month: card.expiryMonth,
        year: card.expiryYear,
      },
      CCV: card.ccv,
      card_brand: card.type,
    };

    return axios.post(`${API_URL}/card/saveCard`, data, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
  },
  updateCard: (card, token) => {
    let data = {
      _id: card.id,
      name_on_card: card.name,
      card_number: card.number,
      expiry_date: {
        month: card.expiryMonth,
        year: card.expiryYear,
      },
      CCV: card.ccv,
      card_brand: card.type,
    };
    return axios.put(`${API_URL}/card/updateCard`, data, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
  },
  myCards: (token) => {
    return axios.get(`${API_URL}/card/myCards`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
  },
  deleteCard: (cardId, token) => {
    return axios.delete(`${API_URL}/card/${cardId}`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
  },
};
export default Card;
