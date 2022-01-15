import React, {useEffect} from 'react';
import {Text, View, Image, ScrollView, ActivityIndicator} from 'react-native';
import Color from '../../../theme/Color';
import Fonts from '../../../theme/Fonts';
import {wp} from '../../../helpers/Responsiveness';
import Header from '../../../components/Header';
import ProfileListItem from '../../../components/ProfileListItem';
import {createStackNavigator} from '@react-navigation/stack';
import Membership from './Membership';
import {connect} from 'react-redux';
import {logoutUser} from '../../../redux/User/auth/actions';
import {getProfile} from '../../../redux/User/profile/actions';
import Orders from './Orders';
import OrderDetail from './Orders/OrderDetail';
import {myNotifications} from '../../../redux/User/notifications/actions';
const Stack = createStackNavigator();

const Profile = ({
  navigation,
  seller,
  reduxLogoutUser,
  token,
  profile,
  reduxGetProfile,
  loading,
  unreadNotifications,
  reduxMyNotifications,
}) => {
  useEffect(() => {
    reduxGetProfile(token);
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      reduxMyNotifications(token);
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Header back backCall={() => navigation.goBack()} title="My Account" />

      <ScrollView style={{flex: 1}}>
        {loading ? (
          <View style={[styles.row, {justifyContent: 'center'}]}>
            <ActivityIndicator color="#000" size="small" />
          </View>
        ) : (
          <View style={styles.row}>
            <Image
              source={{
                uri: profile?.profile_image
                  ? profile.profile_image
                  : 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80',
              }}
              style={styles.imageStyle}
            />
            <View style={styles.titleContainer}>
              <Text numberOfLines={1} style={styles.heading}>
                {profile?.name}
              </Text>
              <Text numberOfLines={1} style={styles.subHeading}>
                {profile?.email}
              </Text>
            </View>
          </View>
        )}

        <ProfileListItem
          iconGroup="Feather"
          iconName="edit"
          title="Edit Profile"
          onPress={() => navigation.navigate('EditProfile', {profile: profile})}
        />
        <ProfileListItem
          iconGroup="SimpleLineIcons"
          iconName="location-pin"
          title="Shipping Address"
          onPress={() => navigation.navigate('Address', {profile: true})}
        />
        <ProfileListItem
          iconGroup="Feather"
          iconName="heart"
          title="Wishlist"
          tag
          tagValue="New"
          onPress={() => navigation.navigate('Wishlist')}
        />
        <ProfileListItem
          iconGroup="MaterialIcons"
          iconName="history"
          title="Order History"
          onPress={() => navigation.navigate('OrderHistory')}
        />
        <ProfileListItem
          iconGroup="MaterialIcons"
          iconName="find-replace"
          title="Order Tracking"
          onPress={() => navigation.navigate('TrackOrder')}
        />
        {seller && (
          <ProfileListItem
            iconGroup="MaterialCommunityIcons"
            iconName="truck-delivery"
            title="Orders"
            onPress={() => navigation.navigate('Orders')}
          />
        )}
        <ProfileListItem
          iconGroup="AntDesign"
          iconName="customerservice"
          title="Support"
          onPress={() => navigation.navigate('Support')}
        />

        <ProfileListItem
          iconGroup="Feather"
          iconName="credit-card"
          title="Payment Options"
          onPress={() => navigation.navigate('Cards')}
        />

        <ProfileListItem
          iconGroup="MaterialCommunityIcons"
          iconName="wallet-membership"
          title="Try our Membership"
          onPress={() => navigation.navigate('Membership')}
        />

        {!seller && (
          <ProfileListItem
            iconGroup="Feather"
            iconName="settings"
            title="Settings"
            onPress={() => navigation.navigate('Settings')}
          />
        )}

        <ProfileListItem
          iconGroup="Feather"
          iconName="bell"
          title="Notifications"
          tag
          tagValue={unreadNotifications.length}
          onPress={() => navigation.navigate('Notifications')}
        />

        <ProfileListItem
          iconGroup="MaterialCommunityIcons"
          iconName="logout"
          title="Logout"
          onPress={() => {
            reduxLogoutUser();
          }}
        />
      </ScrollView>
    </View>
  );
};

function ProfileStack(props) {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="AuthNavigator">
      <Stack.Screen name="Profile" children={() => <Profile {...props} />} />
      <Stack.Screen name="Membership" component={Membership} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
    </Stack.Navigator>
  );
}

const mapStateToProps = ({
  authReducer,
  profileReducer,
  notificationReducer,
}) => {
  return {
    token: authReducer.token,
    seller: authReducer.seller,
    profile: profileReducer.profile,
    loading: profileReducer.profileLoading,
    unreadNotifications: notificationReducer.unreadNotifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxLogoutUser: () => dispatch(logoutUser()),
    reduxGetProfile: (token) => dispatch(getProfile(token)),
    reduxMyNotifications: (token) => dispatch(myNotifications(token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileStack);

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imageStyle: {
    height: wp(25),
    width: wp(25),
    borderRadius: wp(5),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(100),
    paddingHorizontal: wp(5),
    paddingVertical: wp(8),
  },
  heading: {
    fontSize: wp(7),
    fontFamily: Fonts.SFProText,
  },
  subHeading: {
    fontSize: wp(3.6),
    fontFamily: Fonts.SFProText,
  },
  titleContainer: {
    flex: 1,
    marginTop: wp(8),
    marginLeft: wp(5),
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(100),
    height: wp(17),
    paddingHorizontal: wp(10),
    borderTopWidth: wp(0.3),
    borderTopColor: '#E5E5E5',
  },
  itemLeftIcon: {
    height: wp(7),
    width: wp(7),
    borderRadius: wp(2),
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTitle: {
    flex: 1,
    marginLeft: wp(5),
    fontSize: wp(4),
  },
};
