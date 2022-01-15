import React, {useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Header from '../../../components/Header';
import Color from '../../../theme/Color';
import Fonts from '../../../theme/Fonts';
import {wp} from '../../../helpers/Responsiveness';
import {connect} from 'react-redux';
import {getOrders} from '../../../redux/User/order/actions';
import moment from 'moment';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import New from './Orders/New';
import Ongoing from './Orders/Ongoing';
import Past from './Orders/Past';
const Tab = createMaterialTopTabNavigator();

const OrderTabs = (props) => {
  return (
    <>
      <Header back backCall={() => props.navigation.goBack()} title="Orders" />
      <Tab.Navigator tabBarOptions={{
        activeTintColor:Color.primary,
        inactiveTintColor:Color.secondary,
        indicatorStyle:{backgroundColor:Color.primary},
        labelStyle:{fontSize:wp(3)},
        pressColor:Color.primary
      }}>
        <Tab.Screen name="New Orders" component={New} />
        <Tab.Screen name="Ongoing Orders" component={Ongoing} />
        <Tab.Screen name="Past Orders" component={Past} />
      </Tab.Navigator>
    </>
  );
};

const Orders = (props) => {
  useEffect(() => {
    props.reduxGetOrders(props.token);
  }, []);
  if (props.orders?.length > 0) {
    return <OrderTabs {...props} />;
  } else {
    return (
      <View style={styles.container}>
        <Header
          back
          backCall={() => props.navigation.goBack()}
          title="Orders"
        />

        {props.loading ? (
          <ActivityIndicator
            color="#000"
            size="small"
            style={{marginTop: wp(60)}}
          />
        ) : (
          <View style={{marginTop: wp(60)}}>
            <Text>No Orders</Text>
          </View>
        )}
        {/* <ScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.block}>
          {props.orders?.map((order, i) => {
            return (
              <View key={i}>
                <Text style={styles.date}>
                  {moment(order.createdAt).format('ll')}
                </Text>
  
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('OrderTrackingDetails', {
                      order: order,
                    })
                  }
                  key={i}
                  style={styles.itemBlock}>
                  <View style={styles.detailBlock}>
                    <Text style={styles.heading}>#{order.tracking_number}</Text>
                    <Text style={styles.subHeading}>${order.sub_total}</Text>
                    <Text style={styles.subHeading}>{order.delivery_type}</Text>
  
                    <View
                      style={
                        order.status
                          ? {...styles.status, backgroundColor: '#000'}
                          : styles.status
                      }>
                      <Text style={styles.statusText}>
                        {order.in_history ? `In Transit` : `Delivered`}
                      </Text>
                    </View>
                  </View>
  
                  <View style={styles.imageGroup}>
                    {order.products?.map((product, index) => (
                      <View key={index}>
                        {index > 3 && order.products.length === index + 1 && (
                          <View style={styles.imageBlock}>
                            <Text style={{fontSize: wp(4)}}>
                              +{order.products.length - 3}
                            </Text>
                          </View>
                        )}
                        {order.products.length == 1 ? (
                          <Image
                            source={{uri: product.product.images[0]}}
                            style={[
                              styles.imageStyle,
                              {height: wp(26.5), width: wp(26.5)},
                            ]}
                          />
                        ) : index === 0 ||
                          index === 1 ||
                          index === 2 ||
                          (index === 3 && order.products.length === 4) ? (
                          <Image
                            source={{uri: product.product.images[0]}}
                            style={styles.imageStyle}
                          />
                        ) : null}
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView> */}
      </View>
    );
  }
};

const mapStateToProps = (state) => {
  console.log('ORDERS', state.orderReducer.orders);
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
export default connect(mapStateToProps, mapDispatchToProps)(Orders);

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  block: {
    width: wp(90),
    paddingBottom: wp(10),
  },
  itemBlock: {
    backgroundColor: '#fff',
    marginTop: wp(3),
    paddingHorizontal: wp(5),
    paddingVertical: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 1,
    elevation: 2,
  },
  detailBlock: {
    height: wp(30),
    justifyContent: 'space-evenly',
  },
  imageGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: wp(30),
  },
  imageStyle: {
    height: wp(13),
    width: wp(13),
    margin: wp(0.8),
    borderRadius: wp(2),
  },
  imageBlock: {
    height: wp(13),
    width: wp(13),
    margin: wp(0.8),
    borderRadius: wp(2),
    borderColor: '#f0f0f0',
    borderWidth: wp(0.2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    fontSize: wp(3.8),
    fontFamily: Fonts.SFProDisplay,
    color: 'gray',
    marginTop: wp(10),
  },
  heading: {
    fontSize: wp(3.8),
    fontFamily: Fonts.SFProDisplayBold,
  },
  subHeading: {
    fontSize: wp(3.8),
    fontFamily: Fonts.SFProDisplay,
    color: Color.primary,
  },
  status: {
    backgroundColor: Color.primary,
    width: wp(20),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: wp(1),
  },
  statusText: {
    color: '#fff',
    fontFamily: Fonts.SFProTextSemibold,
  },
};
