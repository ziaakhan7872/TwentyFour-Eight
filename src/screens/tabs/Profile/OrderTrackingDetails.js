import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Header from '../../../components/Header';
import {wp} from '../../../helpers/Responsiveness';
import Color from '../../../theme/Color';
import {RadioButtonInput} from 'react-native-simple-radio-button';
import Fonts from '../../../theme/Fonts';
import moment from 'moment';
const StatusItem = ({date, status, location}) => {
  return (
    <View style={styles.itemBlock}>
      <View style={{width: wp(13)}}>
        <Text numberOfLines={1} style={styles.date}>
          {date ? moment(date).format('DD/MM') : null}
        </Text>
        <Text numberOfLines={1} style={styles.time}>
          {date ? moment(date).format('hh:mm A') : null}
        </Text>
      </View>
      <RadioButtonInput
        isSelected={location}
        obj={{}}
        onPress={() => {}}
        borderWidth={1.5}
        buttonInnerColor={Color.primary}
        buttonOuterColor={location ? Color.primary : '#dddddd'}
        buttonSize={wp(4.5)}
        buttonOuterSize={wp(8)}
      />
      <View style={{width: wp(32)}}>
        <Text numberOfLines={1} style={styles.status}>
          {status}
        </Text>
        <Text numberOfLines={1} style={styles.location}>
          {location}
        </Text>
      </View>
    </View>
  );
};

const OrderTrackingDetails = ({route, navigation}) => {
  const {order} = route.params;
  console.log(order);
  return (
    <View style={styles.container}>
      <Header
        back
        backCall={() => navigation.goBack()}
        title={order.orderID}
        plain
        locationPin
      />
      <ScrollView style={{flex: 1}}>
        <StatusItem
          date={order.stage1.created_at}
          status="Order Signed"
          location={order.stage1.location}
        />

        <View
          style={
            order.stage2.location
              ? styles.line
              : {...styles.line, backgroundColor: '#f0f0f0'}
          }
        />

        <StatusItem
          date={order.stage2.created_at}
          status="Order Processed"
          location={order.stage2.location}
        />

        <View
          style={
            order.stage3.location
              ? styles.line
              : {...styles.line, backgroundColor: '#f0f0f0'}
          }
        />

        <StatusItem
          date={order.stage3.created_at}
          status="Shipped"
          location={order.stage3.location}
        />

        <View
          style={
            order.stage4.location
              ? styles.line
              : {...styles.line, backgroundColor: '#f0f0f0'}
          }
        />

        <StatusItem
          date={order.stage4.created_at}
          status="Out for delivery"
          location={order.stage4.location}
        />

        <View
          style={
            order.stage5.location
              ? styles.line
              : {...styles.line, backgroundColor: '#f0f0f0'}
          }
        />

        <StatusItem
          date={order.stage5.created_at}
          status="Delivered"
          location={order.stage5.location}
        />
      </ScrollView>
    </View>
  );
};

export default OrderTrackingDetails;

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemBlock: {
    width: wp(65),
    marginLeft: wp(6),
    marginTop: wp(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: wp(10),
  },
  date: {
    fontSize: wp(3.5),
    fontFamily: Fonts.SFProDisplay,
    color: 'gray',
  },
  time: {
    fontSize: wp(3),
    fontFamily: Fonts.SFProDisplay,
    color: 'gray',
  },
  status: {
    fontSize: wp(4.1),
    fontFamily: Fonts.SFProDisplayMedium,
  },
  location: {
    fontSize: wp(3.5),
    fontFamily: Fonts.SFProDisplay,
  },
  line: {
    width: wp(0.7),
    height: wp(25),
    backgroundColor: Color.primary,
    marginLeft: wp(28.5),
    marginVertical: -wp(11),
  },
};
