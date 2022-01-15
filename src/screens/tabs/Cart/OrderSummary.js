import React, {useState, useEffect} from 'react';
import {Image, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import Header from '../../../components/Header';
import Font from '../../../theme/Fonts';
import Color from '../../../theme/Color';
import {wp} from '../../../helpers/Responsiveness';
import CheckoutTray from '../../../components/CheckoutTray';
import SolidButton from '../../../components/SolidButton';
import OutlineButton from '../../../components/OutlineButton';
import Feather from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import {newOrder} from '../../../redux/User/order/actions';
import {getPlan} from '../../../redux/User/discount/actions';

const OrderSummary = (props) => {
  const {deliveryType, address, card, CodeDiscount} = props.route.params;
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  useEffect(() => {
    props.reduxGetPlan(props.token);
  }, []);

  useEffect(() => {
    var quantity = 0;
    var price = 0;
    var discount = 0;
    props.cartItems.forEach((item) => {
      quantity = quantity + item.quantity;
      price = price + item.quantity * item.price;
      discount = discount + (item.quantity * item.price * item.discount) / 100;
    });

    setTotalQuantity(quantity);
    setTotalPrice(price);
    setTotalDiscount(discount);
  }, [props.cartItems]);

  const secureCardNumber = (cardNumber) => {
    let no = '';
    for (let index = 0; index < cardNumber.length - 7; index++) {
      no += '*';
    }
    no += cardNumber.slice(cardNumber.length - 4, cardNumber.length);
    return no;
  };

  const createOrder = () => {
    props.reduxNewOrder(props.token, {
      deliveryType,
      address,
      products: props.cartItems.map((item, index) => {
        return {
          product: item._id,
          quantity: item.quantity,
          color: item.SelectedColor,
          size: item.SelectedSize,
        };
      }),
      totalPrice,
      totalDiscount:
        totalDiscount +
        (typeof props.currentPlan.membership === 'object' &&
        Object.keys(props.currentPlan.membership).length > 0
          ? totalPrice * 0.1
          : 0) +
        (CodeDiscount != 0 ? CodeDiscount : 0),
      subTotal:
        totalPrice -
        (totalDiscount +
          (typeof props.currentPlan.membership === 'object' &&
          Object.keys(props.currentPlan.membership).length > 0
            ? totalPrice * 0.1
            : 0) +
          (CodeDiscount != 0 ? CodeDiscount : 0)),
    });
  };

  const Order = (
    <View style={{height: wp(41), marginTop: wp(8), marginBottom: wp(5)}}>
      <ScrollView horizontal style={{flex: 1}}>
        {props.cartItems.map((item, i) => {
          return (
            <View
              key={i}
              style={
                i
                  ? {
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: wp(25),
                      marginRight: wp(7),
                    }
                  : {
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: wp(25),
                      marginLeft: wp(4),
                      marginRight: wp(7),
                    }
              }>
              <Image
                source={
                  item.images.length == 0
                    ? require('../../../assets/images/icon.png')
                    : {uri: item.images[0]}
                }
                style={{height: wp(25), width: wp(25)}}
              />

              <Text
                numberOfLines={1}
                style={{
                  fontSize: wp(4),
                  fontFamily: Font.SFProText,
                  fontWeight: 'bold',
                  alignSelf: 'flex-start',
                }}>
                {item.name}
              </Text>
              {item.discount ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: wp(25),
                  }}>
                  <Text
                    style={{
                      fontSize: wp(4),
                      fontFamily: Font.SFProText,
                      fontWeight: '700',
                      color: Color.primary,
                    }}>
                    $
                    {Math.floor(
                      item.price - (item.price * item.discount) / 100,
                    )}
                  </Text>

                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: wp(3),
                      fontFamily: Font.SFProText,
                      color: 'gray',
                      marginLeft: wp(1),
                      textDecorationLine: 'line-through',
                    }}>
                    ${item.price}
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: wp(25),
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: wp(4),
                      fontFamily: Font.SFProText,
                      fontWeight: '700',
                      color: Color.primary,
                    }}>
                    ${item.price}
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
  return (
    <View style={styles.container}>
      <Header back backCall={() => props.navigation.goBack()} title="Summary" />

      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: wp(20)}}>
        {Order}

        <View style={{borderTopWidth: wp(0.5), borderTopColor: '#f0f0f0'}}>
          <View style={{paddingHorizontal: wp(4), paddingVertical: wp(7)}}>
            <Text style={styles.heading}>Delivery Type</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.subHeading}>{deliveryType}</Text>
              <View style={styles.check}>
                <Feather name="check" size={wp(5)} color="#fff" />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Delivery')}>
              <Text
                style={{
                  ...styles.heading,
                  color: Color.primary,
                  marginTop: wp(5),
                }}>
                Change
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{borderTopWidth: wp(0.5), borderTopColor: '#f0f0f0'}}>
          <View style={{paddingHorizontal: wp(4), paddingVertical: wp(7)}}>
            <Text style={styles.heading}>Shipping Address</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.subHeading}>{address}</Text>
              <View style={styles.check}>
                <Feather name="check" size={wp(5)} color="#fff" />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Address')}>
              <Text
                style={{
                  ...styles.heading,
                  color: Color.primary,
                  marginTop: wp(5),
                }}>
                Change
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{borderTopWidth: wp(0.5), borderTopColor: '#f0f0f0'}}>
          <View style={{paddingHorizontal: wp(4), paddingVertical: wp(7)}}>
            <Text style={styles.heading}>Payment</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={
                  card?.card_brand == 'VISA'
                    ? require('../../../assets/images/visa.png')
                    : card?.card_brand == 'MASTER'
                    ? require('../../../assets/images/mastercardLogo.png')
                    : require('../../../assets/images/icon.png')
                }
                style={{height: wp(10), width: wp(10), resizeMode: 'contain'}}
              />
              <View style={{width: wp(60), marginLeft: wp(10)}}>
                <Text style={{...styles.subHeading, color: 'gray'}}>
                  {card?.card_brand}
                </Text>
                <Text style={styles.subHeading}>
                  {secureCardNumber(card.card_number)}
                </Text>
              </View>
              <View style={styles.check}>
                <Feather name="check" size={wp(5)} color="#fff" />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Payment')}>
              <Text
                style={{
                  ...styles.heading,
                  color: Color.primary,
                  marginTop: wp(5),
                }}>
                Change
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginTop: wp(10),
            backgroundColor: '#FBFBFB',
            paddingTop: wp(5),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: wp(3),
              width: wp(100),
              paddingHorizontal: wp(4),
            }}>
            <Text
              style={{
                fontSize: wp(3.8),
                fontFamily: Font.SFProText,
                width: wp(22),
              }}>
              SubTotal
            </Text>
            <Text
              numberOfLines={1}
              style={{
                color: '#DDDDDD',
                letterSpacing: wp(0.3),
                fontSize: wp(4),
                flex: 1,
              }}>
              -------------------------------------------
            </Text>
            <Text
              style={{
                fontSize: wp(3.8),
                fontFamily: Font.SFProTextSemibold,
                textAlign: 'right',
              }}>
              $ {totalPrice}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: wp(3),
              width: wp(100),
              paddingHorizontal: wp(4),
            }}>
            <Text
              style={{
                fontSize: wp(3.8),
                fontFamily: Font.SFProText,
                width: wp(22),
                color: '#000',
              }}>
              Discount
            </Text>
            <Text
              numberOfLines={1}
              style={{
                color: '#DDDDDD',
                letterSpacing: wp(0.3),
                fontSize: wp(4),
                flex: 1,
              }}>
              -------------------------------------------
            </Text>
            <Text
              style={{
                fontSize: wp(3.8),
                fontFamily: Font.SFProTextSemibold,
                textAlign: 'right',
              }}>
              $ {totalDiscount}
            </Text>
          </View>

          {typeof props.currentPlan.membership === 'object' &&
            Object.keys(props.currentPlan.membership).length > 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingBottom: wp(3),
                  width: wp(100),
                  paddingHorizontal: wp(4),
                }}>
                <Text
                  style={{
                    fontSize: wp(3.8),
                    fontFamily: Font.SFProText,
                    width: wp(42),
                  }}>
                  Membership Discount
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    color: '#DDDDDD',
                    letterSpacing: wp(0.3),
                    fontSize: wp(4),
                    flex: 1,
                  }}>
                  -----------------------------------------
                </Text>
                <Text
                  style={{
                    fontSize: wp(3.8),
                    fontFamily: Font.SFProTextSemibold,
                    textAlign: 'right',
                  }}>
                  $ {totalPrice * 0.1}
                </Text>
              </View>
            )}

          {CodeDiscount != 0 && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: wp(3),
                width: wp(100),
                paddingHorizontal: wp(4),
              }}>
              <Text
                style={{
                  fontSize: wp(3.8),
                  fontFamily: Font.SFProText,
                  width: wp(35),
                  color: '#000',
                }}>
                Voucher Discount
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  color: '#DDDDDD',
                  letterSpacing: wp(0.3),
                  fontSize: wp(4),
                  flex: 1,
                }}>
                -------------------------------
              </Text>
              <Text
                style={{
                  fontSize: wp(3.8),
                  fontFamily: Font.SFProTextSemibold,
                  textAlign: 'right',
                }}>
                $ {CodeDiscount}
              </Text>
            </View>
          )}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#F0F0F0',
              paddingHorizontal: wp(4),
              paddingVertical: wp(5),
            }}>
            <Text
              style={{
                fontSize: wp(3.8),
                fontFamily: Font.SFProText,
                color: 'red',
              }}>
              SubTotal
            </Text>

            <Text
              style={{
                fontSize: wp(3.8),
                fontFamily: Font.SFProTextSemibold,
                color: 'red',
              }}>
              ${' '}
              {totalPrice -
                totalDiscount -
                (typeof props.currentPlan.membership === 'object' &&
                Object.keys(props.currentPlan.membership).length > 0
                  ? totalPrice * 0.1
                  : 0) -
                (CodeDiscount != 0 ? CodeDiscount : 0)}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonRow}>
        <OutlineButton
          onClick={() => props.navigation.navigate('Cart')}
          placeholder="BACK"
          width={40}
        />
        <SolidButton
          onClick={createOrder}
          placeholder="PAY"
          width={40}
          loading={props.loading}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    cartItems: state.cartItems.cart,
    loading: state.orderReducer.orderLoading,
    currentPlan: state.discountReducer.plan,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxNewOrder: (token, order) => dispatch(newOrder(token, order)),
    reduxGetPlan: (token) => dispatch(getPlan(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: wp(4.5),
    fontFamily: Font.SFProDisplay,
    fontWeight: 'bold',
    color: '#000000',
  },
  subHeading: {
    fontSize: wp(3.8),
    fontFamily: Font.SFProDisplay,
    marginTop: wp(3),
    color: '#000000',
    width: wp(80),
  },
  check: {
    height: wp(6),
    width: wp(6),
    borderRadius: wp(6),
    backgroundColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(4),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: wp(3),
  },
};
