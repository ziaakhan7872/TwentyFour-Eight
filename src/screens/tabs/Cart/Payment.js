import React, {useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../../components/Header';
import CheckoutTray from '../../../components/CheckoutTray';
import Fonts from '../../../theme/Fonts';
import {wp} from '../../../helpers/Responsiveness';
import SolidButton from '../../../components/SolidButton';
import OutlineButton from '../../../components/OutlineButton';
import Input from '../../../components/Input';
import Feather from 'react-native-vector-icons/Feather';
import {
  saveCard,
  resetCard,
  myCards,
  updateCard,
} from '../../../redux/User/card/actions';
import {connect} from 'react-redux';
import Colors from '../../../theme/Color';
const Payment = ({
  navigation,
  route,
  loading,
  message,
  token,
  reduxSaveCard,
  reduxResetCard,
  reduxMyCards,
  reduxUpdateCard,
  cards,
}) => {
  const {deliveryType, address} = route.params;
  const [visa, setVisa] = useState(true);
  const [payPal, setPayPal] = useState(false);
  const [mastercard, setMastercard] = useState(false);
  const [saveCard, toggleSaveCard] = useState(false);

  const [savedCard, setSavedCard] = useState({});
  const [Name, setName] = useState('');
  const [Number, setNumber] = useState('');
  const [Date, setDate] = useState('');
  const [Cvv, setCvv] = useState('');
  const [Type, setType] = useState('');

  useEffect(() => {
    reduxMyCards(token);
    const unsubscribe = navigation.addListener('blur', () => {});
    return unsubscribe;
  }, [navigation]);

  const next = () => {
    console.log('card', savedCard);
    if (typeof savedCard === 'object' && Object.keys(savedCard).length > 0) {
      navigation.navigate('OrderSummary', {
        deliveryType: deliveryType,
        address: address,
        card: savedCard,
        CodeDiscount: route.params.CodeDiscount,
      });
    } else {
      if (Name && Number && Date && Cvv && Type) {
        if (saveCard) {
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
        navigation.navigate('OrderSummary', {
          deliveryType: deliveryType,
          address: address,
          card: {
            card_brand: Type,
            card_number: Number,
          },
          CodeDiscount: route.params.CodeDiscount,
        });
      } else {
        ToastAndroid.show('Please enter a card', 500);
      }
    }
  };

  const ChangePaymentMethod = (type) => {
    switch (type) {
      case 'visa':
        setVisa(true);
        setPayPal(false);
        setMastercard(false);
        break;

      case 'payPal':
        setVisa(false);
        setPayPal(true);
        setMastercard(false);
        break;

      case 'mastercard':
        setVisa(false);
        setPayPal(false);
        setMastercard(true);
        break;

      default:
        break;
    }
  };

  const secureCardNumber = (cardNumber) => {
    let no = '';
    for (let index = 0; index < cardNumber.length - 7; index++) {
      no += '*';
    }
    no += cardNumber.slice(cardNumber.length - 4, cardNumber.length);
    return no;
  };

  return (
    <View style={styles.container}>
      <Header
        back
        backCall={() => navigation.goBack()}
        title="Payment Options"
      />

      <ScrollView style={{flex: 1}}>
        <CheckoutTray
          delivery
          address
          payment
          deliveryPress={() => navigation.navigate('Delivery')}
          addressPress={() => navigation.navigate('Address')}
          paymentPress={() => navigation.navigate('Payment')}
        />

        {/* 
        <Text style={styles.heading}>Select a Card</Text>
        <View style={styles.paymentRow}>
          <TouchableOpacity
            onPress={() => ChangePaymentMethod('visa')}
            style={visa ? styles.activePaymentCheck : styles.paymentCheck}>
            {visa ? (
              <Image
                source={require('../../../assets/images/visaActive.png')}
                style={{
                  height: wp(11.5),
                  width: wp(11.5),
                  resizeMode: 'contain',
                }}
              />
            ) : (
              <Image
                source={require('../../../assets/images/visa.png')}
                style={{
                  height: wp(11.5),
                  width: wp(11.5),
                  resizeMode: 'contain',
                }}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => ChangePaymentMethod('payPal')}
            style={payPal ? styles.activePaymentCheck : styles.paymentCheck}>
            {payPal ? (
              <Image
                source={require('../../../assets/images/payPalActive.png')}
                style={{height: wp(14), width: wp(14), resizeMode: 'contain'}}
              />
            ) : (
              <Image
                source={require('../../../assets/images/payPal.png')}
                style={{height: wp(14), width: wp(14), resizeMode: 'contain'}}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => ChangePaymentMethod('mastercard')}
            style={
              mastercard ? styles.activePaymentCheck : styles.paymentCheck
            }>
            {mastercard ? (
              <Image
                source={require('../../../assets/images/mastercardActive.png')}
                style={{height: wp(10), width: wp(10), resizeMode: 'contain'}}
              />
            ) : (
              <Image
                source={require('../../../assets/images/mastercard.png')}
                style={{height: wp(10), width: wp(10), resizeMode: 'contain'}}
              />
            )}
          </TouchableOpacity>
        </View>
*/}
        {cards.length != 0 ? (
          <>
            <Text style={styles.heading}>Saved Cards</Text>
            {cards.map((card, i) => {
              return (
                <TouchableOpacity
                  onPress={() => setSavedCard(card)}
                  key={i}
                  style={[
                    styles.productContainer,
                    {borderColor: savedCard == card ? '#000' : '#f0f0f0'},
                  ]}>
                  <Image
                    source={
                      card.card_brand == 'VISA'
                        ? require('../../../assets/images/visa.png')
                        : card.card_brand == 'MASTERCARD'
                        ? require('../../../assets/images/mastercard.png')
                        : require('../../../assets/images/icon.png')
                    }
                    style={styles.productImageStyle}
                  />

                  <View style={styles.productDetailContainer}>
                    <Text style={styles.productName}>{card.name_on_card}</Text>
                    <Text style={styles.productCategory}>
                      {secureCardNumber(card.card_number)}
                    </Text>
                    <Text style={styles.productPrice}>
                      {card.expiry_date.month} / {card.expiry_date.year}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </>
        ) : (
          <>
            <Input
              placeholder="Name on Card"
              value={Name}
              onChangeText={setName}
            />
            <Input
              placeholder="Card Number"
              value={Number}
              onChangeText={setNumber}
              validateCardNumber
              cardType={setType}
            />

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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

            <View style={{...styles.row, marginTop: wp(8)}}>
              {saveCard ? (
                <TouchableOpacity
                  onPress={() => toggleSaveCard(false)}
                  style={styles.check}>
                  <Feather name="check" size={wp(5)} color="#fff" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => toggleSaveCard(true)}
                  style={styles.checkO}
                />
              )}
              <Text style={styles.subHeading}>Save this card details</Text>
            </View>
          </>
        )}

        <View style={styles.buttonRow}>
          <OutlineButton
            onClick={() => navigation.goBack()}
            placeholder="BACK"
            width={40}
          />
          <SolidButton onClick={next} placeholder="NEXT" width={40} bold />
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = ({authReducer, cardReducer}) => {
  return {
    loading: cardReducer.cardLoading,
    message: cardReducer.cardMessage,
    token: authReducer.token,
    cards: cardReducer.cards,
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
export default connect(mapStateToProps, mapDispatchToProps)(Payment);

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
    borderColor: Colors.primary,
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
    backgroundColor: Colors.primary,
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
    marginTop: wp(10),
    backgroundColor: '#fff',
    paddingVertical: wp(3),
    
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(92),
    height: wp(18),
    paddingHorizontal: wp(5),
    borderWidth: wp(0.2),
    borderColor: '#f0f0f0',
    alignSelf: 'center',
  },
  productImageStyle: {
    height: wp(10),
    width: wp(10),
    resizeMode: 'contain',
  },
  productDetailContainer: {
    flex: 1,
    marginHorizontal: wp(3),
    marginTop: wp(3),
  },
  productName: {
    fontSize: wp(2.9),
    fontFamily: Fonts.SFProTextSemibold,
  },
  productCategory: {
    fontSize: wp(2.5),
    fontFamily: Fonts.SFProText,
  },
  productPrice: {
    fontSize: wp(2.5),
    fontFamily: Fonts.SFProText,
    color: Colors.primary,
  },
};
