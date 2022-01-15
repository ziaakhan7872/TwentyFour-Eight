import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import Header from '../../../components/Header';
import {connect} from 'react-redux';
import {
  myNotifications,
  deleteNotification,
  makeAsRead,
} from '../../../redux/User/notifications/actions';
import {wp} from '../../../helpers/Responsiveness';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';
import Fonts from '../../../theme/Fonts';
const Notifications = ({
  navigation,
  loading,
  token,
  unreadNotifications,
  notifications,
  reduxMyNotifications,
  reduxDeleteNotification,
  reduxMakeAsRead
}) => {
  useEffect(() => {
    reduxMyNotifications(token);
  }, []);

  useEffect(() => {
    unreadNotifications.map((item, index) => reduxMakeAsRead(item._id, token));
  }, [unreadNotifications]);

  const deleteNotification = (id) => {
    reduxDeleteNotification(id, token);
  };
  return (
    <View style={styles.container}>
      <Header back backCall={() => navigation.goBack()} title="Notifications" />
      {loading ? (
        <ActivityIndicator
          color="#000"
          size="small"
          style={{marginTop: wp(60)}}
        />
      ) : notifications?.length > 0 ? null : (
        <View style={{marginTop: wp(60)}}>
          <Text>No Notifications</Text>
        </View>
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        {notifications?.map((item, index) => (
          <View
            key={index}
            style={{
              marginBottom: wp(3),
              marginTop: index == 0 ? wp(3) : 0,
            }}>
            <View style={styles.row}>
              <Text style={styles.type}>{String(item.type).toUpperCase()}</Text>
              <TouchableOpacity
                onPress={() => deleteNotification(item._id)}
                style={styles.crossContainer}>
                <Text style={styles.crossText}>x</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.item}>
              <Text style={styles.subject}>{item.subject}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <Text style={styles.createdAt}>
              {moment(item.createdAt).fromNow()}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = ({notificationReducer, authReducer}) => {
  return {
    loading: notificationReducer.loading,
    notifications: notificationReducer.notifications,
    unreadNotifications: notificationReducer.unreadNotifications,
    token: authReducer.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxMyNotifications: (token) => dispatch(myNotifications(token)),
    reduxDeleteNotification: (id, token) =>
      dispatch(deleteNotification(id, token)),
    reduxMakeAsRead: (id, token) => dispatch(makeAsRead(id, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  type: {
    fontSize: wp(2.5),
    color: 'gray',
    textAlign: 'left',
    paddingLeft: wp(1),
    fontFamily: Fonts.SFProText,
  },
  item: {
    backgroundColor: '#fff',
    width: wp(85),
    padding: wp(3),
    margin: 2,
    borderRadius: wp(2),
    elevation: 2,
  },
  subject: {
    fontSize: wp(3.1),
    color: 'black',
    textAlign: 'left',
    fontFamily: Fonts.SFProDisplayMedium,
  },
  description: {
    fontSize: wp(3),
    color: 'black',
    fontFamily: Fonts.SFProDisplayMedium,
  },
  createdAt: {
    fontSize: wp(2.5),
    color: 'gray',
    textAlign: 'right',
    paddingRight: wp(1),
    fontFamily: Fonts.SFProText,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  crossContainer: {
    backgroundColor: '#ededef',
    height: wp(4),
    width: wp(4),
    borderRadius: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(1),
  },
  crossText: {
    fontSize: wp(3),
    fontFamily: Fonts.SFProDisplayMedium,
    marginBottom: wp(1),
  },
};
