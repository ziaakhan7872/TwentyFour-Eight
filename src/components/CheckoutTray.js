import React from 'react';
import {Text, View} from 'react-native';
import {wp} from '../helpers/Responsiveness';
import Color from '../theme/Color';
import {RadioButtonInput} from 'react-native-simple-radio-button';
import Fonts from '../theme/Fonts';

const CheckoutTray = ({
  delivery,
  deliveryPress,
  address,
  addressPress,
  payment,
  paymentPress,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: wp(4),
        marginTop: wp(7),
      }}>
      <View>
        <RadioButtonInput
          isSelected={delivery}
          obj={{}}
          onPress={deliveryPress}
          borderWidth={1.5}
          buttonInnerColor={Color.primary}
          buttonOuterColor={delivery ? Color.primary : '#dddddd'}
          buttonSize={wp(4.5)}
          buttonOuterSize={wp(8)}
        />
        <Text style={delivery ? styles.activeText : styles.inactiveText}>
          Delivery
        </Text>
      </View>

      <View style={address ? styles.activeFirstLine : styles.firstLine} />

      <View>
        <RadioButtonInput
          isSelected={address}
          borderWidth={1.5}
          obj={{}}
          onPress={addressPress}
          buttonInnerColor={Color.primary}
          buttonOuterColor={address ? Color.primary : '#dddddd'}
          buttonSize={wp(4.5)}
          buttonOuterSize={wp(8)}
        />
        <Text style={address ? styles.activeText : styles.inactiveText}>
          Address
        </Text>
      </View>

      <View style={payment ? styles.activeSecondLine : styles.secondLine} />

      <View>
        <RadioButtonInput
          isSelected={payment}
          borderWidth={1.5}
          obj={{}}
          onPress={paymentPress}
          buttonInnerColor={Color.primary}
          buttonOuterColor={payment ? Color.primary : '#dddddd'}
          buttonSize={wp(4.5)}
          buttonOuterSize={wp(8)}
        />
        <Text style={payment ? styles.activeText : styles.inactiveText}>
          Payments
        </Text>
      </View>
    </View>
  );
};

export default CheckoutTray;

const styles = {
  activeText: {
    fontSize: wp(2.8),
    fontFamily: Fonts.SFProDisplay,
    marginTop: wp(3),
    color: '#000000',
  },
  inactiveText: {
    fontSize: wp(2.8),
    fontFamily: Fonts.SFProDisplay,
    marginTop: wp(3),
    color: '#dddddd',
  },
  firstLine: {
    position: 'absolute',
    backgroundColor: '#dddddd',
    height: 1.5,
    width: wp(32.5),
    left: wp(8.5),
    top: wp(4),
  },
  activeFirstLine: {
    position: 'absolute',
    backgroundColor: Color.primary,
    height: 1.5,
    width: wp(32.5),
    left: wp(8.5),
    top: wp(4),
  },
  secondLine: {
    position: 'absolute',
    backgroundColor: '#dddddd',
    height: 1.5,
    width: wp(33),
    left: wp(49),
    top: wp(4),
  },
  activeSecondLine: {
    position: 'absolute',
    backgroundColor: Color.primary,
    height: 1.5,
    width: wp(33),
    left: wp(49),
    top: wp(4),
  },
};
