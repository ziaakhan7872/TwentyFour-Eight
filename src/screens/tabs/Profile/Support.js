import React, {useState, useEffect} from 'react';
import {Text, View, TextInput, ScrollView, ToastAndroid} from 'react-native';
import Header from '../../../components/Header';
import Fonts from '../../../theme/Fonts';
import Color from '../../../theme/Color';
import {wp} from '../../../helpers/Responsiveness';
import SolidButton from '../../../components/SolidButton';
import {
  sendMessageToSupport,
  profileReset,
} from '../../../redux/User/profile/actions';
import {connect} from 'react-redux';

const Support = ({
  navigation,
  reduxSendMessageToSupport,
  token,
  loading,
  reduxProfileReset,
}) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      reduxProfileReset();
    });
    return unsubscribe;
  }, [navigation]);

  const SUBMIT = () => {
    if (subject != '') {
      if (message.length > 3) {
        reduxSendMessageToSupport(
          {
            message: message,
            subject: subject,
          },
          token,
        );
      } else {
        ToastAndroid.show(
          'Message length should be at-least of 4 characters',
          1500,
        );
      }
    } else {
      ToastAndroid.show('Subject is mandatory', 1000);
    }
  };
  return (
    <View style={styles.container}>
      <Header back backCall={() => navigation.goBack()} title="Support" />

      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: wp(10), alignItems: 'center'}}>
        <Text style={styles.heading}>Need some help?</Text>
        <Text style={styles.subHeading}>
          Get lost? Don't know how to use? feel free to get in touch with us
        </Text>

        <View style={{width: wp(80), marginTop: wp(10)}}>
          <TextInput
            placeholder="Subject"
            value={subject}
            onChangeText={setSubject}
            style={styles.inputStyle}
          />
          <TextInput
            placeholder="Type a message"
            value={message}
            onChangeText={setMessage}
            textAlignVertical="top"
            multiline={true}
            numberOfLines={3}
            style={styles.inputStyle}
          />
        </View>

        <SolidButton
          onClick={SUBMIT}
          placeholder="SUBMIT"
          style={{marginTop: wp(10)}}
          bold
          loading={loading}
        />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = ({authReducer, profileReducer}) => {
  console.log(profileReducer);
  return {
    token: authReducer.token,
    loading: profileReducer.profileLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxSendMessageToSupport: (supportMessage, token) =>
      dispatch(sendMessageToSupport(supportMessage, token)),
    reduxProfileReset: () => dispatch(profileReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Support);

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  block: {
    width: wp(90),
    marginVertical: wp(6),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: wp(3),
  },
  heading: {
    fontSize: wp(4.2),
    fontFamily: Fonts.SFProDisplayMedium,
    marginTop: wp(12),
  },
  subHeading: {
    fontSize: wp(3.8),
    fontFamily: Fonts.SFProDisplay,
    color: 'gray',
    width: wp(60),
    marginTop: wp(3),
  },
  inputStyle: {
    borderBottomWidth: wp(0.3),
    borderBottomColor: 'gray',
    fontSize: wp(4.3),
    fontFamily: Fonts.SFProDisplay,
    color: '#000',
    marginVertical: wp(3),
  },
};
