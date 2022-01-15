import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text} from 'react-native';
import Header from '../../../components/Header';
import Fonts from '../../../theme/Fonts';
import Color from '../../../theme/Color';
import {wp} from '../../../helpers/Responsiveness';
import SolidButton from '../../../components/SolidButton';
import Input from '../../../components/Input';
import {
  saveCard,
  resetCard,
  myCards,
  updateCard,
} from '../../../redux/User/card/actions';
import {connect} from 'react-redux';

const AddCard = ({
  navigation,
  route,
  loading,
  message,
  token,
  reduxSaveCard,
  reduxResetCard,
  reduxMyCards,
  reduxUpdateCard,
}) => {
  const [id, setId] = useState('');
  const [Name, setName] = useState('');
  const [Number, setNumber] = useState('');
  const [Date, setDate] = useState('');
  const [Cvv, setCvv] = useState('');
  const [Type, setType] = useState('');
  useEffect(() => {
    if (route?.params?.card) {
      const {card} = route.params;
      setId(card._id);
      setName(card.name_on_card);
      setNumber(card.card_number);
      setDate(`${card.expiry_date.month}/${card.expiry_date.year.slice(2, 4)}`);
      setCvv(String(card.CCV).toString());
      setType(card.card_brand);
    }
    const unsubscribe = navigation?.addListener('blur', () => {
      reduxMyCards(token);
      reduxResetCard();
    });
    return unsubscribe;
  }, [navigation]);

  const addCard = () => {
    reduxResetCard();

    if (route.params?.card) {
      reduxUpdateCard(
        {
          id: id,
          name: Name,
          number: Number,
          expiryMonth: Date.slice(0, 2),
          expiryYear: `20${Date.slice(3, 5)}`,
          ccv: Cvv,
          type: Type,
        },
        token,
      );
    } else {
      reduxSaveCard(
        {
          name: Name,
          number: Number,
          expiryMonth: Date.slice(0, 2),
          expiryYear: `20${Date.slice(3, 5)}`,
          ccv: Cvv,
          type: Type,
        },
        token,
      );
    }
  };

  return (
    <View style={styles.container}>
      <Header back backCall={() => navigation.goBack()} title="Cards" />

      <ScrollView style={{flex: 1}}>
        <Input placeholder="Name on Card" value={Name} onChangeText={setName} />
        <Input
          placeholder="Card Number"
          value={Number}
          onChangeText={setNumber}
          validateCardNumber
          cardType={setType}
        />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Input
            placeholder="Expiry Date"
            value={Date}
            onChangeText={setDate}
            validateExpiryDate
          />
          <Input
            placeholder="CVV"
            value={Cvv}
            onChangeText={setCvv}
            validateCvv
          />
        </View>
      </ScrollView>
      <Text style={{marginTop: wp(4), textAlign: 'center'}}>{message}</Text>
      <View style={styles.buttonRow}>
        <SolidButton
          onClick={addCard}
          placeholder="SAVE"
          bold
          loading={loading}
        />
      </View>
    </View>
  );
};

const mapStateToProps = ({authReducer, cardReducer}) => {
  return {
    loading: cardReducer.cardLoading,
    message: cardReducer.cardMessage,
    token: authReducer.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxResetCard: () => dispatch(resetCard()),
    reduxMyCards: (token) => dispatch(myCards(token)),
    reduxSaveCard: (card, token) => dispatch(saveCard(card, token)),
    reduxUpdateCard: (card, token) => dispatch(updateCard(card, token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddCard);

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(5),
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#F8F8FA',
    paddingVertical: wp(6),
  },
  activePaymentCheck: {
    height: wp(12),
    width: wp(25),
    borderRadius: wp(2),
    borderWidth: wp(0.3),
    borderColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentCheck: {
    height: wp(12),
    width: wp(25),
    borderRadius: wp(2),
    borderWidth: wp(0.3),
    borderColor: '#8A8A8F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  check: {
    height: wp(6),
    width: wp(6),
    borderRadius: wp(6),
    backgroundColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(4),
  },
  checkO: {
    height: wp(6),
    width: wp(6),
    borderRadius: wp(6),
    borderColor: '#d2d2d4',
    borderWidth: wp(0.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(4),
  },
  heading: {
    fontSize: wp(4),
    fontFamily: Fonts.SFProDisplay,
    fontWeight: '700',
    color: '#000000',
    marginLeft: wp(4),
    marginTop: wp(8),
    marginBottom: wp(4),
  },
  subHeading: {
    fontSize: wp(3.8),
    fontFamily: Fonts.SFProDisplay,
    color: '#000000',
    width: wp(80),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: wp(2),
    backgroundColor: '#fff',
    paddingVertical: wp(3),
  },
};
