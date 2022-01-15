import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {wp} from '../helpers/Responsiveness';
import Font from '../theme/Fonts';
import Color from '../theme/Color';

const OutlineButton = ({
  placeholder,
  onClick,
  width,
  height,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        ...styles.buttonStyle,
        ...style,
        width: wp(width || 70),
        height: wp(height || 13),
      }}>
      <Text style={{...styles.text, ...textStyle}}>{placeholder}</Text>
    </TouchableOpacity>
  );
};

export default OutlineButton;

const styles = {
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: wp(10),
  },
  text: {
    color: Color.secondary,
    fontSize: wp(3.5),
    fontFamily: Font.SFProDisplay,
  },
};
