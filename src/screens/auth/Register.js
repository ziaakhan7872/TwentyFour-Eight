import React, {useState, useEffect} from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fonts from '../../theme/Fonts';
import {PickImage} from '../../helpers/Images';
import {connect} from 'react-redux';
import {
  registerUser,
  resetAuth,
  socialLogin,
} from '../../redux/User/auth/actions';
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
const Register = ({
  token,
  navigation,
  authLoading,
  authMessage,
  reduxRegisterUser,
  reduxResetAuth,
  reduxSocialLogin,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(authMessage);
  const [GoogleLoading, setGoogleLoading] = useState(false);
  const [FacebookLoading, setFacebookLoading] = useState(false);

  const handleImagePicker = () => PickImage(setImage);

  const validateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  };

  const onRegisterUser = () => {
    if (!name.length) {
      setErrorMessage('Username Empty.');
    } else if (name.length > 20) {
      setErrorMessage('Username must not exceed 20 characters.');
    } else if (!email.length) {
      setErrorMessage('Email Empty.');
    } else if (!validateEmail(email)) {
      setErrorMessage('Invalid Email Format.');
    } else if (!password.length) {
      setErrorMessage('Password Empty.');
    } else if (password.length < 6) {
      setErrorMessage('Password must be of 6 characters.');
    } else if (password != confirmPassword) {
      setErrorMessage('Passwords mismatch');
    } else if (!image) {
      setErrorMessage('Please add an image.');
    } else {
      setErrorMessage('');
      reduxRegisterUser(
        name,
        String(email).toLocaleLowerCase(),
        password,
        image,
      );
    }
  };

  useEffect(() => {
    if (token) {
      navigation.navigate('BottomTabs');
    }
  }, [token]);

  useEffect(() => {
    setErrorMessage(authMessage);
  }, [authMessage]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setErrorMessage('');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setImage(null);
      reduxResetAuth();
      setGoogleLoading(false);
      setFacebookLoading(false);
    });
    return unsubscribe;
  }, [navigation]);

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
            contentContainerStyle={{
              alignItems: 'center',
              paddingVertical: wp(22),
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={styles.loginButton}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleImagePicker}>
              <Image
                source={
                  image
                    ? {uri: image.uri}
                    : require('../../assets/images/icon.png')
                }
                style={styles.imageStyle}
              />
            </TouchableOpacity>
            <View style={styles.uploadButton}>
              <Text style={styles.subHeading}>Upload photo</Text>
              <TouchableOpacity onPress={handleImagePicker}>
                <Ionicons
                  name="md-add-circle-outline"
                  size={wp(7)}
                  color="black"
                  style={{marginLeft: wp(1)}}
                />
              </TouchableOpacity>
            </View>

            <InputField
              leftSource={require('../../assets/images/userIcon.png')}
              leftSourceHeight={wp(3.5)}
              leftSourceWidth={wp(3.5)}
              placeholder="Username"
              value={name}
              onChangeText={setName}
            />

            <InputField
              leftSource={require('../../assets/images/emailIcon.png')}
              leftSourceHeight={wp(4)}
              leftSourceWidth={wp(4)}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />

            <InputField
              leftSource={require('../../assets/images/passwordIcon.png')}
              leftSourceHeight={wp(4)}
              leftSourceWidth={wp(3.5)}
              placeholder="Password"
              value={password}
              secureTextEntry
              onChangeText={setPassword}
              rightSource={require('../../assets/images/eye.png')}
              rightSourceHeight={wp(4)}
              rightSourceWidth={wp(4)}
            />

            <InputField
              leftSource={require('../../assets/images/passwordIcon.png')}
              leftSourceHeight={wp(4)}
              leftSourceWidth={wp(3.5)}
              placeholder="Confirm Password"
              value={confirmPassword}
              secureTextEntry
              onChangeText={setConfirmPassword}
              rightSource={require('../../assets/images/eye.png')}
              rightSourceHeight={wp(4)}
              rightSourceWidth={wp(4)}
            />

            <Text style={styles.grayText}>
              By pressing “submit” you agree to our
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
              <Text style={styles.term}>terms & conditions</Text>
            </TouchableOpacity>
            <Text style={styles.errorMessageStyle}>{errorMessage}</Text>
            <View style={{marginTop: wp(2), marginBottom: wp(10)}}>
              <SolidButton
                onClick={onRegisterUser}
                placeholder="SUBMIT"
                bold
                loading={authLoading}
              />
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.orLine} />
            </View>
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
    reduxRegisterUser: (name, email, password, image) =>
      dispatch(registerUser(name, email, password, image)),
    reduxResetAuth: () => dispatch(resetAuth()),
    reduxSocialLogin: (socialInfo) => dispatch(socialLogin(socialInfo)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: wp(10),
    backgroundColor: Color.background,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(29),
    marginTop: wp(3.8),
    marginBottom: wp(5.5),
  },
  loginButton: {
    position: 'absolute',
    top: wp(4),
    right: wp(8),
  },
  subHeading: {
    fontSize: wp(3.7),
    fontFamily: Fonts.SFProDisplayBold,
    color: Color.secondary,
    lineHeight: wp(5.5),
  },
  loginText: {
    fontSize: wp(3.6),
    color: Color.primary,
    fontFamily: Fonts.SFProDisplayBold,
  },
  grayText: {
    fontSize: wp(2.8),
    color: 'gray',
    textAlign: 'center',
    marginTop: wp(2),
    fontFamily: Fonts.SFProText,
  },
  term: {
    fontSize: wp(2.8),
    color: Color.primary,
    fontFamily: Fonts.SFProText,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  orText: {
    fontSize: wp(4.5),
    fontFamily: Fonts.SFProText,
    marginHorizontal: wp(2),
  },
  orLine: {
    height: 2,
    width: wp(45),
    backgroundColor: '#f0f0f0',
  },
  socialIconStyle: {
    height: wp(4),
    width: wp(4),
    resizeMode: 'contain',
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
    marginTop: wp(6),
  },
  imageStyle: {
    height: wp(25),
    width: wp(25),
    borderRadius: wp(25),
  },
  errorMessageStyle: {
    fontSize: wp(3),
    fontFamily: Fonts.SFProText,
    color: 'red',
    textAlign: 'center',
    marginTop: wp(5),
  },
};
