import React, {useState} from 'react';
import {Text, View, TextInput, Image} from 'react-native';
import Fonts from '../theme/Fonts';
import Color from '../theme/Color';
import {wp} from '../helpers/Responsiveness';

const Input = ({
  placeholder,
  placeHolderStyle,
  value,
  onChangeText,
  validateCardNumber,
  validateExpiryDate,
  validateCvv,
  cardType,
}) => {
  const [imageUrl, setImageUrl] = useState(null);
  const cardNumberFormatter = (oldValue, newValue) => {
    if (newValue[0] == 4) {
      setImageUrl(require('../assets/images/visaActive.png'));
      cardType('VISA');
    } else if (newValue[0] == 5) {
      setImageUrl(require('../assets/images/mastercardActive.png'));
      cardType('MASTERCARD');
    } else {
      setImageUrl(null);
      cardType('OTHERS');
    }
    if (oldValue.length > newValue.length) {
      return newValue;
    }

    return newValue
      .replace(/\W/gi, '')
      .replace(/(.{4})/g, '$1-')
      .substring(0, 19);
  };

  const expirationDateFormatter = (oldValue, newValue) => {
    if (oldValue.length > newValue.length) {
      return newValue;
    }

    return newValue
      .replace(/\W/gi, '')
      .replace(/(.{2})/g, '$1/')
      .substring(0, 5);
  };

  const cardCvv = (oldValue, newValue) => {
    if (oldValue.length > newValue.length) {
      return newValue;
    }

    return newValue.substring(0, 3);
  };
  return (
    <View style={styles.inputContainer}>
      <Text style={{...styles.placeholderStyle, ...placeHolderStyle}}>
        {placeholder}
      </Text>
      <View style={styles.inputMainContainer}>
        <TextInput
          value={value}
          onChangeText={(text) => {
            let newValue;
            if (validateExpiryDate) {
              newValue = expirationDateFormatter(value, text);
            } else if (validateCardNumber) {
              newValue = cardNumberFormatter(value, text);
            } else if (validateCvv) {
              newValue = cardCvv(value, text);
            } else {
              newValue = text;
            }
            onChangeText(newValue);
          }}
          style={styles.inputStyle}
          keyboardType={
            validateCardNumber || validateExpiryDate || validateCvv
              ? 'number-pad'
              : 'default'
          }
        />
        {imageUrl && (
          <Image
            source={imageUrl}
            style={{height: wp(8), width: wp(8), resizeMode: 'contain'}}
          />
        )}
      </View>
    </View>
  );
};

export default Input;

const styles = {
  inputContainer: {
    flex: 1,
    paddingHorizontal: wp(5),
    marginTop: wp(8),
  },
  placeholderStyle: {
    fontSize: wp(3.8),
    fontFamily: Fonts.SFProDisplay,
    color: 'gray',
  },
  inputStyle: {
    flex: 1,
    fontSize: wp(4.5),
    fontFamily: Fonts.SFProDisplay,
    color: '#000',
  },
  inputMainContainer: {
    flexDirection: 'row',
    alignItem: 'center',
    borderBottomWidth: wp(0.3),
    borderBottomColor: Color.primary,
    marginTop: wp(1),
  },
};
