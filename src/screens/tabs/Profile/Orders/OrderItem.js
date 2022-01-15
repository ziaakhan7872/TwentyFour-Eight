import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {wp} from '../../../../helpers/Responsiveness';
import Colors from '../../../../theme/Color';
import Fonts from '../../../../theme/Fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';

const OrderItem = ({New, Ongoing, Past, onPress}) => {
  const [Drop, setDrop] = useState(false);
  const [OrderStatus, setOrderStatus] = useState('Order Dispatched');
  return (
    <View style={[styles.container, {marginBottom: Drop ? wp(30) : wp(3)}]}>
      <View style={styles.headingRow}>
        <Image
          source={require('../../../../assets/images/icon.png')}
          style={styles.dp}
        />
        <View style={{marginLeft: wp(5), flex: 1}}>
          <Text style={styles.heading}>Angel James</Text>
          <Text style={styles.subHeading}>Today 12:00 AM</Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={styles.subHeading}>Order Id: 348</Text>
          <Text style={styles.subHeading}>Total: $105.00</Text>
        </View>
      </View>
      <View style={styles.orderItemContainer}>
        <Text style={styles.subHeading}>T-shirt polo</Text>
        <Text style={styles.subHeading}>Qty: 2</Text>
        <Text style={styles.subHeading}>$ 25.00</Text>
      </View>
      <View style={styles.orderItemContainer}>
        <Text style={styles.subHeading}>T-shirt polo</Text>
        <Text style={styles.subHeading}>Qty: 2</Text>
        <Text style={styles.subHeading}>$ 25.00</Text>
      </View>
      <View style={styles.orderItemContainer}>
        <Text style={styles.subHeading}>T-shirt polo</Text>
        <Text style={styles.subHeading}>Qty: 2</Text>
        <Text style={styles.subHeading}>$ 25.00</Text>
      </View>
      {New && (
        <View style={styles.controlContainer}>
          <View style={styles.outlineButtonContainer}>
            <TouchableOpacity onPress={onPress} style={styles.outlineButton}>
              <Text style={styles.outlineButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <View
              style={[
                styles.solidButtonContainer,
                {backgroundColor: '#F80707', marginRight: wp(2)},
              ]}>
              <TouchableOpacity style={styles.solidButton}>
                <Text style={styles.solidButtonText}>Cancel Order</Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.solidButtonContainer,
                {backgroundColor: Colors.green},
              ]}>
              <TouchableOpacity style={styles.solidButton}>
                <Text style={styles.solidButtonText}>Accept Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {Ongoing && (
        <View style={styles.controlContainer}>
          <View style={styles.row}>
            <Text>Order Status: </Text>
            <View
              style={[
                styles.outlineButtonContainer,
                {
                  borderColor: Colors.primary,
                  marginLeft: wp(2),
                  width: wp(33.4),
                },
              ]}>
              <TouchableOpacity
                onPress={() => setDrop(!Drop)}
                style={styles.dropDownContainer}>
                <Text
                  style={[styles.outlineButtonText, {color: Colors.primary}]}>
                  {OrderStatus}
                </Text>
                <AntDesign
                  name="caretdown"
                  size={wp(3)}
                  color="black"
                  style={{marginLeft: wp(2)}}
                />
              </TouchableOpacity>
            </View>
          </View>

          {Drop && (
            <View style={styles.dropDown}>
              <TouchableOpacity
                onPress={() => {
                  setOrderStatus('Order Processing');
                  setDrop(false);
                }}>
                <Text style={styles.dropDownItem}>Order Processing</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setOrderStatus('Order Dispatched');
                  setDrop(false);
                }}>
                <Text style={styles.dropDownItem}>Order Dispatched</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setOrderStatus('On the way');
                  setDrop(false);
                }}>
                <Text style={styles.dropDownItem}>On the way</Text>
              </TouchableOpacity>
            </View>
          )}

          <View
            style={[
              styles.outlineButtonContainer,
              {borderColor: Colors.primary},
            ]}>
            <TouchableOpacity onPress={onPress} style={styles.outlineButton}>
              <Text style={[styles.outlineButtonText, {color: Colors.primary}]}>
                View Details
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {Past && (
        <View style={styles.controlContainer}>
          <View style={styles.row}>
            <Text style={[styles.heading, {color: Colors.primary}]}>
              Order Status:{' '}
            </Text>
            <Text style={[styles.heading, {color: Colors.green}]}>
              Delivered
            </Text>
          </View>

          <View
            style={[
              styles.outlineButtonContainer,
              {borderColor: Colors.primary},
            ]}>
            <TouchableOpacity onPress={onPress} style={styles.outlineButton}>
              <Text style={[styles.outlineButtonText, {color: Colors.primary}]}>
                View Details
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    backgroundColor: 'rgba(138, 138, 143,0.05)',
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(138, 138, 143,0.1)',
    paddingHorizontal: wp(5),
    paddingVertical: wp(2),
  },
  dp: {
    height: wp(10),
    width: wp(10),
    borderRadius: wp(10),
    borderWidth: 1.3,
  },
  orderItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: wp(3),
    paddingHorizontal: wp(5),
  },
  controlContainer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(138, 138, 143,0.1)',
    paddingHorizontal: wp(5),
    paddingVertical: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  outlineButtonContainer: {
    backgroundColor: '#fff',
    borderRadius: wp(1),
    borderWidth: 1.5,
    borderColor: '#8A8A8F',
  },
  outlineButton: {
    paddingHorizontal: wp(3),
    paddingVertical: wp(2) - 1.5,
  },
  outlineButtonText: {
    color: '#8A8A8F',
    fontSize: wp(2.8),
    fontFamily: Fonts.SFProDisplayMedium,
  },
  solidButtonContainer: {
    backgroundColor: '#fff',
    borderRadius: wp(1.5),
  },
  solidButton: {
    paddingHorizontal: wp(3),
    paddingVertical: wp(2),
  },
  solidButtonText: {
    color: '#fff',
    fontSize: wp(2.8),
    fontFamily: Fonts.SFProDisplayMedium,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropDownContainer: {
    paddingHorizontal: wp(3),
    paddingVertical: wp(2) - 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropDown: {
    position: 'absolute',
    left: wp(27.9),
    top: wp(10),
    width: wp(33.4),
    borderBottomLeftRadius: wp(1),
    borderBottomRightRadius: wp(1),
    borderColor: Colors.primary,
    borderWidth: 1,
    backgroundColor: '#fff',
    zIndex: 100,
  },
  dropDownItem: {
    color: Colors.secondary,
    paddingVertical: wp(2),
    fontSize: wp(2.8),
    fontFamily: Fonts.SFProDisplayMedium,
    paddingHorizontal: wp(3),
    borderBottomWidth: 0.5,
  },
  heading: {
    fontSize: wp(3.2),
    fontFamily: Fonts.SFProDisplay,
  },
  subHeading: {
    fontSize: wp(2.8),
    fontFamily: Fonts.SFProText,
  },
});
