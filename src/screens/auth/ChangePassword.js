import React, {useState} from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Color from '../../theme/Color';
import {wp} from '../../helpers/Responsiveness';
import InputField from '../../components/InputField';
import SolidButton from '../../components/SolidButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fonts from '../../theme/Fonts';

const ChangePassword = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  const UPDATE = () => {
    console.log(password, newPassword, retypePassword);
  };
  return (
    <>
      <StatusBar backgroundColor={Color.background} barStyle="dark-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: Color.background}}>
        <View style={styles.container}>
          <ScrollView
            style={{flex: 1, width: wp(100)}}
            contentContainerStyle={{alignItems: 'center', paddingTop: wp(20)}}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <AntDesign name="arrowleft" size={wp(7)} color="black" />
            </TouchableOpacity>

            <View style={{width: wp(85)}}>
              <Text style={styles.heading}>Change{'\n'}Password</Text>
              <Text style={styles.subHeading}>
                Feeling worried about your account been easily preyed on? Then
                change that password now!
              </Text>
            </View>

            <InputField
              placeholder="Password"
              rightSource={require('../../assets/images/eye.png')}
              rightSourceHeight={wp(4)}
              rightSourceWidth={wp(4)}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <InputField
              placeholder="New Password"
              rightSource={require('../../assets/images/eye.png')}
              rightSourceHeight={wp(4)}
              rightSourceWidth={wp(4)}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />

            <InputField
              placeholder="Retype Password"
              rightSource={require('../../assets/images/eye.png')}
              rightSourceHeight={wp(4)}
              rightSourceWidth={wp(4)}
              value={retypePassword}
              onChangeText={setRetypePassword}
              secureTextEntry
            />

            <SolidButton
              onClick={UPDATE}
              placeholder="Update"
              style={{marginVertical: wp(14)}}
              bold
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default ChangePassword;

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: wp(12),
    backgroundColor: Color.background,
  },
  heading: {
    fontSize: wp(5.6),
    fontFamily: Fonts.SFProDisplayBold,
    color: Color.secondary,
    lineHeight: wp(8),
    marginBottom: wp(2.8),
  },
  subHeading: {
    fontSize: wp(2.9),
    fontFamily: Fonts.SFProText,
    color: Color.secondary,
    width: wp(85),
    marginBottom: wp(5),
  },
  imageStyle: {
    height: wp(45),
    width: wp(45),
    resizeMode: 'contain',
    marginVertical: wp(17),
  },
  backButton: {
    position: 'absolute',
    top: wp(4),
    left: wp(4),
  },
};
