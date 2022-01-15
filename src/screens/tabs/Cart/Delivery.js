import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Header from '../../../components/Header';
import CheckoutTray from '../../../components/CheckoutTray';
import Fonts from '../../../theme/Fonts';
import Color from '../../../theme/Color';
import {wp} from '../../../helpers/Responsiveness';
import {RadioButtonInput} from 'react-native-simple-radio-button';
import SolidButton from '../../../components/SolidButton';
import OutlineButton from '../../../components/OutlineButton';

const Delivery = ({navigation, route}) => {
  const [deliveryType, setDeliveryType] = useState('Standard Delivery');

  const next = () => {
    navigation.navigate('Address', {
      deliveryType: deliveryType,
      CodeDiscount: route.params.CodeDiscount,
    });
  };

  return (
    <View style={styles.container}>
      <Header back backCall={() => navigation.goBack()} title="Checkout" />

      <CheckoutTray
        delivery
        deliveryPress={() => navigation.navigate('Delivery')}
        addressPress={() => navigation.navigate('Address')}
        paymentPress={() => navigation.navigate('Payment')}
      />

      <View style={{marginHorizontal: wp(4), marginTop: wp(10)}}>
        <Text style={styles.heading}>Standard Delivery</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.subHeading}>
            Order will be delivered between 3 - 5 business days
          </Text>
          <RadioButtonInput
            isSelected={deliveryType == 'Standard Delivery'}
            borderWidth={1.5}
            obj={{}}
            onPress={() => {
              setDeliveryType('Standard Delivery');
            }}
            buttonInnerColor="#000000"
            buttonOuterColor="#F0F0F0"
            buttonSize={wp(3.5)}
            buttonOuterSize={wp(6.5)}
            buttonStyle={{backgroundColor: '#F0F0F0'}}
            buttonWrapStyle={{marginLeft: wp(5)}}
          />
        </View>
      </View>

      <View style={{marginHorizontal: wp(4), marginTop: wp(10)}}>
        <Text style={styles.heading}>Next Day Delivery</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.subHeading}>
            Place your order before 6pm and your items will be delivered the
            next day
          </Text>
          <RadioButtonInput
            isSelected={deliveryType == 'Next Day Delivery'}
            borderWidth={1.5}
            obj={{}}
            onPress={() => {
              setDeliveryType('Next Day Delivery');
            }}
            buttonInnerColor="#000000"
            buttonOuterColor="#F0F0F0"
            buttonSize={wp(3.5)}
            buttonOuterSize={wp(6.5)}
            buttonStyle={{backgroundColor: '#F0F0F0'}}
            buttonWrapStyle={{marginLeft: wp(5)}}
          />
        </View>
      </View>

      <View style={{marginHorizontal: wp(4), marginTop: wp(10)}}>
        <Text style={styles.heading}>Nominated Delivery</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.subHeading}>
            Pick a particular date from the calendar and order will be delivered
            on selected date
          </Text>
          <RadioButtonInput
            isSelected={deliveryType == 'Nominated Delivery'}
            borderWidth={1.5}
            obj={{}}
            onPress={() => {
              setDeliveryType('Nominated Delivery');
            }}
            buttonInnerColor="#000000"
            buttonOuterColor="#F0F0F0"
            buttonSize={wp(3.5)}
            buttonOuterSize={wp(6.5)}
            buttonStyle={{backgroundColor: '#F0F0F0'}}
            buttonWrapStyle={{marginLeft: wp(5)}}
          />
        </View>
      </View>

      <View style={styles.buttonRow}>
        <OutlineButton
          onClick={() => navigation.goBack()}
          placeholder="BACK"
          width={40}
        />
        <SolidButton onClick={next} placeholder="NEXT" width={40} />
      </View>
    </View>
  );
};

export default Delivery;

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: wp(5.5),
    fontFamily: Fonts.SFProDisplay,
    fontWeight: 'bold',
    color: '#000000',
  },
  subHeading: {
    fontSize: wp(3.8),
    fontFamily: Fonts.SFProDisplay,
    marginTop: wp(3),
    color: '#000000',
    width: wp(80),
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
