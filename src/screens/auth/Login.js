import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Image,
  StatusBar,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Color from '../../theme/Color';
import {wp} from '../../helpers/Responsiveness';
import InputField from '../../components/InputField';
import SolidButton from '../../components/SolidButton';
import Fonts from '../../theme/Fonts';
import {connect} from 'react-redux';
import {loginUser, resetAuth, socialLogin} from '../../redux/User/auth/actions';
import {GoogleSignin} from '@react-native-community/google-signin';
import {
  AccessToken,
  GraphRequest,
  LoginManager,
  GraphRequestManager,
} from 'react-native-fbsdk';
GoogleSignin.configure({
  androidClientId:
    '382361002348-o1cqe53a69nce4d1ltdddiqsqare3gqp.apps.googleusercontent.com',
});

const Login = ({
  navigation,
  token,
  authLoading,
  authMessage,
  reduxLoginUser,
  reduxResetAuth,
  reduxSocialLogin,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(authMessage);
  const [GoogleLoading, setGoogleLoading] = useState(false);
  const [FacebookLoading, setFacebookLoading] = useState(false);
  const scrollView = useRef(null);

  const validateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  };

  const onLoginUser = () => {
    if (!email.length) {
      setErrorMessage('Email Empty.');
    } else if (!validateEmail(email)) {
      setErrorMessage('Invalid Email Format.');
    } else if (!password.length) {
      setErrorMessage('Password Empty.');
    } else if (password.length < 6) {
      setErrorMessage('Password must be of 6 characters.');
    } else {
      setErrorMessage('');
      reduxLoginUser(String(email).toLocaleLowerCase(), password);
    }
  };

  useEffect(() => {
    setErrorMessage(authMessage);
  }, [authMessage]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setErrorMessage('');
      setEmail('');
      setPassword('');
      reduxResetAuth();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (token) {
      navigation.navigate('BottomTabs');
    }
  }, [token]);

  useEffect(() => {
    if (email || password) {
      scrollView.current.scrollToEnd({animated: true, duration: 1000});
    }
  }, [email, password]);

  const signInWithGoogle = async () => {
    setGoogleLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      let collection = {};
      collection.email = userInfo.user.email;
      collection.lastName = userInfo.user.familyName;
      collection.firstName = userInfo.user.givenName;
      collection.id = userInfo.user.id;
      collection.imageUrl = userInfo.user.photo;
      collection.name = userInfo.user.name;
      reduxSocialLogin(collection);
      setTimeout(() => {
        setGoogleLoading(false);
      }, 5000);
    } catch (error) {
      console.log(error);
      setGoogleLoading(false);
    }
  };

  const signInWithFacebook = () => {
    setFacebookLoading(true);
    LoginManager.logOut();

    LoginManager.logInWithPermissions(['email', 'public_profile'])
      .then(
        (result) => {
          if (result.isCancelled) {
            setFacebookLoading(false);
          } else {
            AccessToken.getCurrentAccessToken()
              .then((data) => {
                console.log(data.accessToken.toString());
                let accessToken = data.accessToken.toString();
                getInfoFromToken(accessToken);
              })
              .catch((error) => {
                console.log('Some error occurred: ' + error);
              });
          }
        },
        function (error) {
          console.log('Login fail with error: ' + error);
        },
      )
      .catch((err) => console.log('catch err', err));
  };

  const getInfoFromToken = (token) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id, email,name,  first_name, last_name,picture.type(large)',
      },
    };
    const profileRequest = new GraphRequest(
      '/me?fields=name,picture.type(large),email',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, result) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          if (result.email != '') {
            let collection = {};
            collection.email = result.email;
            collection.lastName = result.last_name;
            collection.firstName = result.first_name;
            collection.id = result.id;
            collection.imageUrl = result.picture.data.url;
            collection.name = result.name;
            reduxSocialLogin(collection);
            setTimeout(() => {
              setFacebookLoading(false);
            }, 5000);
          }
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  return (
    <>
      <StatusBar backgroundColor={Color.background} barStyle="dark-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: Color.background}}>
        <View style={styles.container}>
          <ScrollView
            style={{flex: 1, width: wp(100)}}
            contentContainerStyle={{alignItems: 'center'}}
            ref={scrollView}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              style={styles.createAccountButton}>
              <Text style={styles.loginText}>Create Account</Text>
            </TouchableOpacity>

            <View style={{width: wp(82)}}>
              <Text style={styles.heading}>Welcome back!</Text>
              <Text style={styles.subHeading}>
                Hi, kindly login to continue shopping
              </Text>
            </View>
            <Image
              source={require('../../assets/images/tourOne.png')}
              style={styles.imageStyle}
            />

            <InputField
              leftSource={require('../../assets/images/emailIcon.png')}
              leftSourceHeight={wp(4)}
              leftSourceWidth={wp(4)}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              onFocus={() => scrollView.current.scrollToEnd()}
            />

            <InputField
              placeholder="Password"
              secureTextEntry
              leftSource={require('../../assets/images/passwordIcon.png')}
              leftSourceHeight={wp(4)}
              leftSourceWidth={wp(3.5)}
              rightSource={require('../../assets/images/eye.png')}
              rightSourceHeight={wp(4)}
              rightSourceWidth={wp(4)}
              value={password}
              onChangeText={setPassword}
              onFocus={() => scrollView.current.scrollToEnd()}
            />

            <TouchableOpacity
              onPress={() => navigation.navigate('Forgot')}
              style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <Text style={styles.errorMessageStyle}>{errorMessage}</Text>

            <SolidButton
              onClick={onLoginUser}
              placeholder="Login"
              bold
              loading={authLoading}
            />

            <View style={[styles.socialButtonContainer, {width: wp(25)}]}>
              <TouchableOpacity
                onPress={signInWithGoogle}
                style={styles.circle}>
                {GoogleLoading ? (
                  <ActivityIndicator color="#000" size="small" />
                ) : (
                  <Image
                    source={require('../../assets/images/google.png')}
                    style={styles.socialIconStyle}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={signInWithFacebook}
                style={styles.circle}>
                {FacebookLoading ? (
                  <ActivityIndicator color="#000" size="small" />
                ) : (
                  <Image
                    source={require('../../assets/images/facebook.png')}
                    style={styles.socialIconStyle}
                  />
                )}
              </TouchableOpacity>

              {/* <TouchableOpacity style={styles.circle}>
                <Image
                  source={require('../../assets/images/twitter.png')}
                  style={styles.socialIconStyle}
                />
              </TouchableOpacity> */}
            </View>
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
    token: authReducer.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxLoginUser: (email, password) => dispatch(loginUser(email, password)),
    reduxResetAuth: () => dispatch(resetAuth()),
    reduxSocialLogin: (socialInfo) => dispatch(socialLogin(socialInfo)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: wp(12),
    backgroundColor: Color.background,
  },
  imageStyle: {
    height: wp(39),
    width: wp(39),
    marginTop: wp(18),
    marginBottom: wp(15),
  },
  heading: {
    fontSize: wp(4.6),
    fontFamily: Fonts.SFProTextSemibold,
    color: Color.secondary,
    marginBottom: wp(1.5),
    marginTop: wp(20),
  },
  subHeading: {
    fontSize: wp(2.9),
    fontFamily: Fonts.SFProText,
    color: Color.secondary,
    lineHeight: wp(5.5),
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
    marginVertical: wp(6),
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginRight: wp(10),
    marginTop: wp(1),
    marginBottom: wp(3),
  },
  forgotPasswordText: {
    fontSize: wp(3),
    fontFamily: Fonts.SFProText,
    color: 'gray',
  },
  errorMessageStyle: {
    fontSize: wp(3),
    fontFamily: Fonts.SFProText,
    color: 'red',
    textAlign: 'center',
    marginBottom: wp(2),
  },
  socialIconStyle: {
    height: wp(4.2),
    width: wp(4.2),
    resizeMode: 'contain',
  },
};
