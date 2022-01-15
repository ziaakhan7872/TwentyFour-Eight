import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import {wp} from '../helpers/Responsiveness';
import Color from '../theme/Color';
import Fonts from '../theme/Fonts';
import EyeIcon from '../assets/images/eye.svg';

const InputField = ({
  leftSource,
  leftSourceHeight,
  leftSourceWidth,
  placeholder,
  rightSource,
  rightSourceHeight,
  rightSourceWidth,
  Seller,
  style,
  value,
  onChangeText,
  multiline,
  secureTextEntry,
  onFocus,
  editable,
  dropDown,
  dropDownList,
  timePicker,
  keyboardType
}) => {
  const [visible, setVisible] = useState(false);
  const [dropDownVisible, setDropDownVisible] = useState(false);

  return (
    <>
      <View style={{...styles.inputContainerStyle, ...style}}>
        {leftSource ? (
          <Image
            source={leftSource}
            style={{
              height: leftSourceHeight,
              width: leftSourceWidth,
              marginRight: wp(2),
              marginLeft: wp(1),
              resizeMode: 'contain',
            }}
          />
        ) : null}
        {dropDown || timePicker ? (
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => setDropDownVisible(!dropDownVisible)}>
            <TextInput
              placeholder={placeholder}
              multiline={multiline ? true : false}
              numberOfLines={multiline ? 4 : 1}
              textAlignVertical={multiline ? 'top' : 'center'}
              secureTextEntry={secureTextEntry && !visible ? true : false}
              placeholderTextColor={Seller ? Color.primary : Color.secondary}
              value={value}
              onChangeText={onChangeText}
              style={
                Seller
                  ? [styles.inputStyle, styles.sellerInputStyle]
                  : styles.inputStyle
              }
              onFocus={onFocus}
              editable={false}
            />
          </TouchableOpacity>
        ) : (
          <TextInput
            placeholder={placeholder}
            multiline={multiline ? true : false}
            numberOfLines={multiline ? 4 : 1}
            textAlignVertical={multiline ? 'top' : 'center'}
            secureTextEntry={secureTextEntry && !visible ? true : false}
            placeholderTextColor={Seller ? Color.primary : Color.secondary}
            value={value}
            onChangeText={onChangeText}
            style={
              Seller
                ? [styles.inputStyle, styles.sellerInputStyle]
                : styles.inputStyle
            }
            onFocus={onFocus}
            editable={editable}
            keyboardType={keyboardType}
          />
        )}
        {rightSource ? (
          <TouchableOpacity
            onPress={() => setVisible(!visible)}
            style={styles.eyeIcon}>
            <EyeIcon height={rightSourceHeight} width={rightSourceWidth} />
          </TouchableOpacity>
        ) : null}
      </View>

      {dropDownVisible && (
        <View
          style={{
            backgroundColor: '#fff',
            width: wp(82),
            height: 'auto',
            borderRadius: 5,
            elevation: 2,
            overflow: 'hidden',
            marginTop:2
          }}>
          {dropDownList.length == 0 && (
            <View style={{alignItems: 'center', paddingVertical: 10}}>
              <Text style={styles.dropDownText}>no results</Text>
            </View>
          )}
          {dropDownList?.map((item, index) => (
            <View
              key={index}
              style={{
                borderBottomColor: '#ededed',
                borderBottomWidth: index == dropDownList.length - 1 ? 0 : 1,
                paddingVertical: 7,
                paddingHorizontal: 5,
                marginBottom: 2,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setDropDownVisible(false);
                  onChangeText(item);
                }}>
                <Text style={styles.dropDownText}>{item}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </>
  );
};

export default InputField;

const styles = {
  inputContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Color.primary,
    borderBottomWidth: 1.3,
    width: wp(82),
    marginBottom: wp(2),
  },
  inputStyle: {
    flex: 1,
    fontSize: wp(2.7),
    color: Color.secondary,
    paddingBottom: wp(1.5),
    fontFamily: Fonts.SFProDisplayMedium,
  },
  sellerInputStyle: {
    fontSize: wp(3.3),
    fontFamily: Fonts.SFProText,
  },
  eyeIcon: {
    height: wp(10),
    width: wp(10),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  dropDownText: {
    fontSize: wp(2.7),
    color: Color.secondary,
    fontFamily: Fonts.SFProDisplayMedium,
  },
};
