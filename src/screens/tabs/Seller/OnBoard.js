import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StatusBar,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import Color from '../../../theme/Color';
import {wp} from '../../../helpers/Responsiveness';
import InputField from '../../../components/InputField';
import SolidButton from '../../../components/SolidButton';
import Fonts from '../../../theme/Fonts';
import {PickImage} from '../../../helpers/Images';
import {connect} from 'react-redux';
import {getCategories} from '../../../redux/Business/Register/actions';

const OnBoard = ({navigation, reduxGetCategories}) => {
  const [userName, setUserName] = useState('');
  const [image, setImage] = useState();

  const handleImagePicker = () => PickImage(setImage);

  useEffect(() => {
    reduxGetCategories();
  }, []);
  const Next = () => {
    if (image) {
      navigation.navigate('BusinessRegistration', {
        businessInfo: {
          username: userName,
          image: image.uri,
        },
      });
    } else {
      ToastAndroid.show('Please add an image', 1500);
    }
  };
  return (
    <>
      <StatusBar backgroundColor={Color.background} barStyle="dark-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: Color.background}}>
        <View style={styles.container}>
          <ScrollView
            style={{flex: 1, width: wp(100)}}
            contentContainerStyle={{alignItems: 'center'}}>
            <View style={{width: wp(82)}}>
              <Text style={styles.heading}>Lets get you{'\n'}on board</Text>
            </View>

            <Image
              source={
                image
                  ? {uri: image.uri}
                  : require('../../../assets/images/userCircleIcon.png')
              }
              style={styles.imageStyle}
            />

            <TouchableOpacity onPress={handleImagePicker}>
              <Text style={styles.subHeading}>Upload a Photo</Text>
            </TouchableOpacity>

            <InputField
              placeholder="User Name"
              Seller
              value={userName}
              onChangeText={setUserName}
            />

            <SolidButton
              bold
              onClick={Next}
              placeholder="Next"
              height={12}
              style={{marginVertical: wp(9)}}
            />

            {/* <View style={styles.socialButtonContainer}>
              <TouchableOpacity style={styles.circle}>
                <Image
                  source={require('../../../assets/images/google.png')}
                  style={styles.socialIconStyle}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.circle}>
                <Image
                  source={require('../../../assets/images/facebook.png')}
                  style={styles.socialIconStyle}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.circle}>
                <Image
                  source={require('../../../assets/images/twitter.png')}
                  style={styles.socialIconStyle}
                />
              </TouchableOpacity>
            </View> */}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxGetCategories: () => dispatch(getCategories()),
  };
};
export default connect(null, mapDispatchToProps)(OnBoard);

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: wp(12),
    backgroundColor: Color.background,
  },
  imageStyle: {
    height: wp(25),
    width: wp(25),
    borderRadius: wp(25),
    marginTop: wp(20),
    marginBottom: wp(3),
  },
  heading: {
    fontSize: wp(4.6),
    fontFamily: Fonts.SFProTextSemibold,
    color: Color.secondary,
    lineHeight: wp(7.5),
    marginTop: wp(20),
  },
  subHeading: {
    fontSize: wp(3.7),
    fontFamily: Fonts.SFProText,
    color: Color.primary,
    marginBottom: wp(20),
  },
  loginText: {
    fontSize: wp(3.6),
    color: Color.primary,
    fontFamily: Fonts.SFProDisplayBold,
  },
  createAccountButton: {
    position: 'absolute',
    top: wp(4),
    right: wp(8),
  },
  circle: {
    height: wp(10),
    width: wp(10),
    borderWidth: 1,
    borderColor: '#f0f0f0',
    borderRadius: wp(10) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 1,
  },
  socialButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(40),
    marginVertical: wp(4),
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginRight: -wp(2),
    marginTop: wp(1),
    marginBottom: wp(9),
  },
  forgotPasswordText: {
    fontSize: wp(3),
    fontFamily: Fonts.SFProText,
    color: 'gray',
  },
  socialIconStyle: {
    height: wp(4.2),
    width: wp(4.2),
    resizeMode: 'contain',
  },
};
