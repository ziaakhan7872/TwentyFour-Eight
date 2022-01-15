import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import Header from '../../../components/Header';
import Fonts from '../../../theme/Fonts';
import Color from '../../../theme/Color';
import {wp} from '../../../helpers/Responsiveness';
import {connect} from 'react-redux';
import {getOrders} from '../../../redux/User/order/actions';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';
const OrderHistory = (props) => {
  useEffect(() => {
    props.reduxGetOrders(props.token);
  }, []);
  return (
    <View style={styles.container}>
      <Header
        back
        backCall={() => props.navigation.goBack()}
        title="OrderHistory"
      />

      {props.loading && (
        <ActivityIndicator
          color="#000"
          size="small"
          style={{marginTop: wp(50)}}
        />
      )}

      {props.orders?.length > 0 ? null : (
        <View style={styles.block}>
          <Text style={styles.heading}>Active Orders</Text>
          <Text style={styles.thinText}>You have no active orders</Text>
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        {props.orders?.map((item, index) => (
          <View key={index}>
            <View style={styles.secondaryBlock}>
              <View style={styles.row}>
                <Text
                  style={{
                    ...styles.heading,
                    fontSize: wp(3.8),
                    color: Color.primary,
                  }}>
                  Order #{item.tracking_number}
                </Text>
                <Text
                  style={{
                    ...styles.heading,
                    fontSize: wp(3.8),
                    color: Color.primary,
                  }}>
                  {item.delivery_type}
                </Text>
              </View>
              <Text style={{...styles.thinText, width: wp(80)}}>
                Placed on {moment(item.createdAt).format('lll')}
              </Text>
            </View>

            {item.products?.map((product, index) => (
              <View
                key={index}
                style={{
                  ...styles.block,
                  width: wp(80),
                  alignItems: 'flex-start',
                }}>
                <Text style={styles.heading}>{product.product?.name}</Text>

                <View style={styles.row}>
                  <View>
                    {/* <Text style={styles.subHeading}>delivery by Foodpanda</Text> */}
                    <Text style={styles.subHeading}>
                      {product.product?.sub_category}
                    </Text>
                    <Text style={styles.subHeading}>
                      1x ${product.product?.price}
                    </Text>
                  </View>

                  <Text style={{...styles.heading, color: Color.primary}}>
                    ${item.sub_total}
                  </Text>
                  {/* <TouchableOpacity style={styles.reorderButton}>
                  <Text style={styles.subHeading}>Reorder</Text>
                </TouchableOpacity> */}
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    loading: state.orderReducer.orderLoading,
    orders: state.orderReducer.orders,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    reduxGetOrders: (token) => dispatch(getOrders(token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  block: {
    width: wp(100),
    height: wp(35),
    paddingVertical: wp(4),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottomWidth: wp(0.4),
    borderBottomColor: '#f0f0f0',
  },
  secondaryBlock: {
    width: wp(80),
    height: wp(25),
    paddingVertical: wp(4),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottomWidth: wp(0.4),
    borderBottomColor: '#f0f0f0',
  },
  heading: {
    fontSize: wp(4.5),
    fontFamily: Fonts.SFProDisplayMedium,
    color: '#000',
  },
  thinText: {
    fontSize: wp(3.7),
    fontFamily: Fonts.SFProDisplay,
    color: 'gray',
  },
  subHeading: {
    fontSize: wp(3.8),
    fontFamily: Fonts.SFProDisplay,
    color: '#000',
  },
  row: {
    width: wp(80),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reorderButton: {
    borderWidth: wp(0.3),
    paddingHorizontal: wp(3),
    paddingVertical: wp(1),
    borderRadius: wp(5),
  },
};
