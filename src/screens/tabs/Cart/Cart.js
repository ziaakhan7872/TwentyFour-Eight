import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {wp} from '../../../helpers/Responsiveness';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Color from '../../../theme/Color';
import Font from '../../../theme/Fonts';
import Header from '../../../components/Header';
import {
  getPlan,
  checkAvailability,
  redeem,
  resetDiscount,
} from '../../../redux/User/discount/actions';
const Cart = (props) => {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [Code, setCode] = useState('');
  const [CodeDiscount, setCodeDiscount] = useState(0);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setCodeDiscount(0)
      setCode('')
      props.reduxResetDiscount();
      props.reduxGetPlan(props.token);
    });
    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    if (props.discount > 0) {
      setCodeDiscount(totalPrice * (props.discount / 100));
    }
  }, [props.discount]);

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

  const applyCode = async () => {
    if (Code) {
      props.reduxCheckAvailability(Code, props.token);
    }
  };

  const checkout = () => {
    props.navigation.navigate('Delivery', {CodeDiscount: CodeDiscount});
  };

  if (!props.cartItems.length) {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../assets/images/emptyCart.png')}
            style={{height: wp(60), width: wp(60), marginTop: wp(25)}}
          />

          <TouchableOpacity
            onPress={() => props.navigation.navigate('Home')}
            style={styles.buttonStyle}>
            <Text
              style={{
                color: Color.background,
                fontSize: wp(3.5),
                fontWeight: '700',
              }}>
              Continue Shopping
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
          {props.cartItems.map((item, i) => {
            return (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: wp(100),
                  paddingHorizontal: wp(4),
                  backgroundColor: '#fff',
                  marginTop: wp(5),
                }}>
                <Image
                  source={
                    item.images.length == 0
                      ? require('../../../assets/images/icon.png')
                      : {uri: item.images[0]}
                  }
                  style={{height: wp(25), width: wp(25)}}
                />
                <View style={{height: wp(25), width: wp(55)}}>
                  <Text
                    style={{
                      fontSize: wp(4),
                      fontFamily: Font.SFProText,
                      fontWeight: 'bold',
                      marginBottom: wp(2),
                    }}>
                    {item.name}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: wp(2.5),
                      width: wp(42),
                    }}>
                    {item.discount ? (
                      <>
                        <Text
                          style={{
                            fontSize: wp(3.5),
                            fontFamily: Font.SFProDisplay,
                            fontWeight: '500',
                          }}>
                          $
                          {Math.floor(
                            item.price - (item.price * item.discount) / 100,
                          )}
                        </Text>
                        <Text
                          style={{
                            fontSize: wp(3.3),
                            fontFamily: Font.SFProDisplay,
                            fontWeight: '500',
                            color: 'gray',
                            textDecorationLine: 'line-through',
                          }}>
                          ${item.price}
                        </Text>
                        <Text
                          style={{
                            fontSize: wp(3.3),
                            fontFamily: Font.SFProText,
                            color: 'red',
                          }}>
                          {item.discount}% OFF
                        </Text>
                      </>
                    ) : (
                      <>
                        <Text
                          style={{
                            fontSize: wp(3.5),
                            fontFamily: Font.SFProText,
                            fontWeight: '500',
                          }}>
                          ${item.price}
                        </Text>
                      </>
                    )}
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: wp(20),
                    }}>
                    <TouchableOpacity
                      onPress={() => props.decrement(item)}
                      style={{
                        backgroundColor: '#f0f0f0',
                        height: wp(8),
                        width: wp(8),
                        borderRadius: wp(1),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <AntDesign name="minus" size={wp(4)} color="black" />
                    </TouchableOpacity>
                    <Text
                      style={{
                        height: wp(8),
                        width: wp(8),
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        fontSize: wp(3.5),
                        fontFamily: Font.SFProText,
                      }}>
                      {item.quantity}
                    </Text>
                    <TouchableOpacity
                      onPress={() => props.increment(item)}
                      style={{
                        backgroundColor: '#f0f0f0',
                        height: wp(8),
                        width: wp(8),
                        borderRadius: wp(1),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <AntDesign name="plus" size={wp(4)} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => props.removeItem(item)}
                      style={{
                        height: wp(10),
                        width: wp(10),
                        borderRadius: wp(1),
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: wp(8),
                      }}>
                      <AntDesign name="delete" size={wp(5)} color="gray" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}

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

            {typeof props.currentPlan?.membership === 'object' &&
              Object.keys(props.currentPlan?.membership).length > 0 && (
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
                  (totalDiscount +
                    (typeof props.currentPlan?.membership === 'object' &&
                    Object.keys(props.currentPlan?.membership).length > 0
                      ? totalPrice * 0.1
                      : 0) +
                    CodeDiscount)}
              </Text>
            </View>
          </View>

          <View style={styles.inputStyle}>
            <TextInput
              placeholder="Enter Voucher Code"
              style={{
                fontSize: wp(3.7),
                width: wp(60),
                fontFamily: Font.SFProText,
              }}
              value={Code}
              onChangeText={setCode}
            />
            <TouchableOpacity onPress={applyCode} style={{padding: wp(3)}}>
              {props.loading ? (
                <ActivityIndicator color="#000" size="small" />
              ) : (
                <Text style={{fontSize: wp(3.7), fontFamily: Font.SFProText}}>
                  {CodeDiscount == 0 ? 'APPLY' : 'APPLIED'}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={checkout}
            style={{
              ...styles.buttonStyle,
              backgroundColor: '#000',
            }}>
            <Text
              style={{
                color: Color.background,
                fontSize: wp(4.2),
                fontWeight: 'bold',
              }}>
              CHECKOUT
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    cartItems: state.cartItems.cart,
    currentPlan: state.discountReducer.plan,
    discount: state.discountReducer.discount,
    loading: state.discountReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (product) =>
      dispatch({type: 'REMOVE_FROM_CART', payload: product}),
    increment: (product) =>
      dispatch({type: 'INCREMENT_QUANTITY', payload: product}),
    decrement: (product) =>
      dispatch({type: 'DECREMENT_QUANTITY', payload: product}),
    reduxGetPlan: (token) => dispatch(getPlan(token)),
    reduxCheckAvailability: (code, token) =>
      dispatch(checkAvailability(code, token)),
    reduxResetDiscount: () => dispatch(resetDiscount()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary,
    width: wp(90),
    height: wp(12),
    borderRadius: wp(10),
    alignSelf: 'center',
    marginBottom: wp(10),
    marginTop: wp(5),
  },
  inputStyle: {
    flexDirection: 'row',
    borderWidth: wp(0.3),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    margin: wp(4),
    borderColor: '#f0f0f0',
    borderRadius: wp(1.2),
    marginTop: wp(5),
  },
};
