import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Image,
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
import {resetAuth, forgotPassword} from '../../redux/User/auth/actions';
import {connect} from 'react-redux';

const Forgot = ({
  navigation,
  authLoading,
  authMessage,
  reduxForgotPassword,
  reduxResetAuth,
}) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const scrollView = useRef(null);

  const validateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setErrorMessage(authMessage);
  }, [authMessage]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setErrorMessage('');
      setEmail('');
      reduxResetAuth();
    });
    return unsubscribe;
  }, [navigation]);

  const handleHandleForgotPassword = () => {
    if (!email.length) {
      setErrorMessage('Email Empty.');
    } else if (!validateEmail(email)) {
      setErrorMessage('Invalid Email Format.');
    } else {
      setErrorMessage('');
      reduxForgotPassword(String(email).toLocaleLowerCase());
    }
  };
  useEffect(() => {
    if (email) {
      scrollView.current.scrollToEnd({animated: true, duration: 1000});
    }
  }, [email]);
  return (
    <>
      <StatusBar backgroundColor={Color.background} barStyle="dark-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: Color.background}}>
        <View style={styles.container}>
          <ScrollView
            ref={scrollView}
            style={{flex: 1, width: wp(100)}}
            contentContainerStyle={{alignItems: 'center', paddingTop: wp(20)}}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <AntDesign name="arrowleft" size={wp(7)} color="black" />
            </TouchableOpacity>

            <View style={{width: wp(85)}}>
              <Text style={styles.heading}>Forgot Password?</Text>
              <Text style={styles.subHeading}>
                Enter your email address below and we'll send you an email with
                instructions on how to change your password
              </Text>
            </View>

            <Image
              source={require('../../assets/images/tourThree.png')}
              style={styles.imageStyle}
            />

            <InputField
              leftSource={require('../../assets/images/emailIcon.png')}
              leftSourceHeight={wp(4)}
              leftSourceWidth={wp(4)}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <Text style={styles.errorMessageStyle}>{errorMessage}</Text>
            <SolidButton
              onClick={handleHandleForgotPassword}
              placeholder="Recover password"
              style={{marginBottom: wp(10), marginTop: wp(2)}}
              bold
              loading={authLoading}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

const mapStateToProps = ({authReducer}) => {
  return {
    authLoading: authReducer.authLoading,
    authMessage: authReducer.authMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxResetAuth: () => dispatch(resetAuth()),
    reduxForgotPassword: (email) => dispatch(forgotPassword(email)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Forgot);
const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: wp(12),
    backgroundColor: Color.background,
  },
  heading: {
    fontSize: wp(4.6),
    fontFamily: Fonts.SFProTextSemibold,
    color: Color.secondary,
    marginBottom: wp(1.5),
  },
  subHeading: {
    fontSize: wp(2.9),
    fontFamily: Fonts.SFProText,
    color: Color.secondary,
    width: wp(60),
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
  errorMessageStyle: {
    fontSize: wp(3),
    fontFamily: Fonts.SFProText,
    color: 'red',
    textAlign: 'center',
    marginTop: wp(5),
  },
};
