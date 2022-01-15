import React, {useState, useEffect} from 'react';
import {Text, View, Switch, ScrollView} from 'react-native';
import Header from '../../../components/Header';
import Fonts from '../../../theme/Fonts';
import Color from '../../../theme/Color';
import {wp} from '../../../helpers/Responsiveness';
import SolidButton from '../../../components/SolidButton';
import {
  updateSettings,
  profileReset,
  getSettings,
} from '../../../redux/User/profile/actions';
import {connect} from 'react-redux';
const Settings = ({
  navigation,
  reduxUpdateSettings,
  token,
  loading,
  reduxProfileReset,
  reduxGetSettings,
  settings,
}) => {
  const [notifications, toggleNotifications] = useState(false);
  const [popup, togglePopup] = useState(false);
  const [history, toggleHistory] = useState(false);

  useEffect(() => {
    reduxGetSettings(token);
  }, []);

  useEffect(() => {
   if(settings){
    toggleNotifications(settings.notifications);
    toggleHistory(settings.order_history);
    togglePopup(settings.pop_ups);
   }
  }, [settings]);

  const updateSetting = () => {
    reduxUpdateSettings(
      {
        notifications: notifications,
        popup: popup,
        history: history,
      },
      token,
    );
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      reduxProfileReset();
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Header back backCall={() => navigation.goBack()} title="Settings" />

      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: wp(10), alignItems: 'center'}}>
        <Text style={{...styles.subHeading, marginTop: wp(12)}}>
          Your App Settings
        </Text>

        <View style={styles.block}>
          <Text style={styles.heading}>Notifications</Text>
          <View style={styles.row}>
            <Text style={styles.subHeading}>
              Receive notifications on latest offers and store updates
            </Text>
            <View style={styles.switchStyle}>
              <Switch
                trackColor={{true: '#fff', false: '#fff'}}
                thumbColor={notifications ? Color.primary : '#f4f3f4'}
                ios_backgroundColor="#fff"
                onValueChange={toggleNotifications}
                value={notifications}
              />
            </View>
          </View>
        </View>

        <View style={styles.block}>
          <Text style={styles.heading}>Popups</Text>
          <View style={styles.row}>
            <Text style={styles.subHeading}>
              Disable all popups and adverts from third party vendors
            </Text>
            <View style={styles.switchStyle}>
              <Switch
                trackColor={{true: '#fff', false: '#fff'}}
                thumbColor={popup ? Color.primary : '#f4f3f4'}
                ios_backgroundColor="#fff"
                onValueChange={togglePopup}
                value={popup}
              />
            </View>
          </View>
        </View>

        <View style={styles.block}>
          <Text style={styles.heading}>Order history</Text>
          <View style={styles.row}>
            <Text style={styles.subHeading}>
              Keep your order history on the app unless manually removed
            </Text>
            <View style={styles.switchStyle}>
              <Switch
                trackColor={{true: '#fff', false: '#fff'}}
                thumbColor={history ? Color.primary : '#f4f3f4'}
                ios_backgroundColor="#fff"
                onValueChange={toggleHistory}
                value={history}
              />
            </View>
          </View>
        </View>

        <SolidButton
          placeholder="UPDATE SETTINGS"
          style={{marginTop: wp(10)}}
          onClick={updateSetting}
          loading={loading}
        />
      </ScrollView>
    </View>
  );
};
const mapStateToProps = ({authReducer, profileReducer}) => {
  return {
    token: authReducer.token,
    loading: profileReducer.profileLoading,
    settings: profileReducer.settings[0],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxUpdateSettings: (settings, token) =>
      dispatch(updateSettings(settings, token)),
    reduxGetSettings: (token) => dispatch(getSettings(token)),
    reduxProfileReset: () => dispatch(profileReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
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
    fontSize: wp(5),
    fontFamily: Fonts.SFProDisplayBold,
  },
  subHeading: {
    fontSize: wp(3.8),
    fontFamily: Fonts.SFProDisplay,
    alignSelf: 'flex-start',
    width: wp(72),
  },
  switchStyle: {
    backgroundColor: '#fff',
    height: wp(6.5),
    width: wp(11),
    borderRadius: wp(100),
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(5),
  },
};
