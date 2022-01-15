import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {wp} from '../helpers/Responsiveness';
import Font from '../theme/Fonts';
import Color from '../theme/Color';

const SolidButton = ({
  placeholder,
  onClick,
  width,
  height,
  style,
  bold,
  textStyle,
  loading,
}) => {
  return (
    <View
      style={{
        ...styles.buttonStyle,
        ...style,
        width: wp(width || 70),
        height: wp(height || 12.5),
      }}>
      <TouchableOpacity
        onPress={onClick}
        style={{
          ...styles.buttonInnerStyle,
          width: wp(width || 70),
          height: wp(height || 12.5),
        }}>
        {loading ? (
          <ActivityIndicator size="small" color={Color.background} />
        ) : (
          <Text
            style={
              bold
                ? {
                    ...styles.text,
                    fontFamily: Font.SFProDisplayBold,
                    ...textStyle,
                  }
                : {...styles.text, ...textStyle}
            }>
            {placeholder}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SolidButton;

const styles = {
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.secondary,
    width: wp(70),
    height: wp(10),
    borderRadius: wp(10),
  },
  buttonInnerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(70),
    height: wp(10),
    borderRadius: wp(10),
  },
  text: {
    color: Color.background,
    fontSize: wp(3.7),
    fontFamily: Font.SFProDisplay,
  },
};
