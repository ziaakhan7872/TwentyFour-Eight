import React from 'react';
import {View, Text} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {wp} from '../../../helpers/Responsiveness';
import Color from '../../../theme/Color';
import Font from '../../../theme/Fonts';

import Dashboard from './Dashboard';
import AddProduct from './AddProduct';
import Products from './Products';
import ProductDetail from './ProductDetail';

import Home from '../Home/Home';
import Categories from '../Home/Categories';
import SubCategories from '../Home/SubCategories';
import Search from '../Home/Search';

import Cart from '../Cart/Cart';
import Profile from '../Profile/Profile';
import Seller from '../Seller/Seller';

import Settings from '../Profile/Settings';
import OrderHistory from '../Profile/OrderHistory';
import Notifications from '../Profile/Notifications';
import EditProfile from '../Profile/EditProfile';
import TrackOrder from '../Profile/TrackOrder';
import OrderTrackingDetails from '../Profile/OrderTrackingDetails';

import {connect} from 'react-redux';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="SubCategories" component={SubCategories} />
    </Stack.Navigator>
  );
}
function ProfileStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="OrderHistory" component={OrderHistory} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="TrackOrder" component={TrackOrder} />
      <Stack.Screen
        name="OrderTrackingDetails"
        component={OrderTrackingDetails}
      />
    </Stack.Navigator>
  );
}
function ProductStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );
}

function SellerBottomTabs(props) {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: Color.primary,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({color, focused}) => {
            if (focused) {
              return (
                <View>
                  <Text style={{color: color, fontFamily: Font.SFProText}}>
                    Explore
                  </Text>
                  <View
                    style={{
                      width: wp(1),
                      height: wp(1),
                      borderRadius: wp(1),
                      backgroundColor: color,
                      alignSelf: 'center',
                      marginTop: wp(1),
                    }}
                  />
                </View>
              );
            } else {
              return <Feather name="home" size={24} color={color} />;
            }
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({color, focused}) => {
            if (focused) {
              return (
                <View>
                  <Text style={{color: color, fontFamily: Font.SFProText}}>
                    Cart
                  </Text>
                  <View
                    style={{
                      width: wp(1),
                      height: wp(1),
                      borderRadius: wp(1),
                      backgroundColor: color,
                      alignSelf: 'center',
                      marginTop: wp(1),
                    }}
                  />
                </View>
              );
            } else {
              return (
                <>
                  <Feather name="shopping-cart" size={24} color={color} />
                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: '#F11010',
                      top: wp(1.5),
                      right: wp(5),
                      height: wp(4),
                      width: wp(4),
                      borderRadius: wp(4),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{color: '#fff', fontSize: 10, fontWeight: 'bold'}}>
                      {props.cartItems.cartItems.cart.length}
                    </Text>
                  </View>
                </>
              );
            }
          },
        }}
      />
      <Tab.Screen
        name="AddProduct"
        component={ProductStack}
        options={{
          tabBarIcon: ({color, focused}) => {
            return (
              <View
                style={{
                  height: wp(13),
                  width: wp(13),
                  borderRadius: wp(13),
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Color.primary,
                  borderWidth: wp(1),
                  borderColor: '#fff',
                  marginTop: -wp(5),
                }}>
                <Entypo name="plus" size={wp(8)} color="#fff" />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({color, focused}) => {
            if (focused) {
              return (
                <View>
                  <Text style={{color: color, fontFamily: Font.SFProText}}>
                    Profile
                  </Text>
                  <View
                    style={{
                      width: wp(1),
                      height: wp(1),
                      borderRadius: wp(1),
                      backgroundColor: color,
                      alignSelf: 'center',
                      marginTop: wp(1),
                    }}
                  />
                </View>
              );
            } else {
              return <Feather name="user" size={24} color={color} />;
            }
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({color, focused}) => {
            if (focused) {
              return (
                <View>
                  <Text style={{color: color, fontFamily: Font.SFProText}}>
                    Setting
                  </Text>
                  <View
                    style={{
                      width: wp(1),
                      height: wp(1),
                      borderRadius: wp(1),
                      backgroundColor: color,
                      alignSelf: 'center',
                      marginTop: wp(1),
                    }}
                  />
                </View>
              );
            } else {
              return <Feather name="settings" size={24} color={color} />;
            }
          },
        }}
      />
    </Tab.Navigator>
  );
}
const mapStateToProps = (state) => {
  return {
    cartItems: state,
  };
};

export default connect(mapStateToProps)(SellerBottomTabs);
