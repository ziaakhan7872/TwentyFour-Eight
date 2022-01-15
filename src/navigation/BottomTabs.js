import React from 'react';
import {View, Text} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/tabs/Home/Home';
import Categories from '../screens/tabs/Home/Categories';
import SubCategories from '../screens/tabs/Home/SubCategories';
import CategoryDetail from '../screens/tabs/Home/CategoryDetail';
import Search from '../screens/tabs/Home/Search';

import Cart from '../screens/tabs/Cart/Cart';
import Profile from '../screens/tabs/Profile/Profile';
import Seller from '../screens/tabs/Seller/Seller';

import Settings from '../screens/tabs/Profile/Settings';
import OrderHistory from '../screens/tabs/Profile/OrderHistory';
import Notifications from '../screens/tabs/Profile/Notifications';
import EditProfile from '../screens/tabs/Profile/EditProfile';
import TrackOrder from '../screens/tabs/Profile/TrackOrder';
import OrderTrackingDetails from '../screens/tabs/Profile/OrderTrackingDetails';
import MembershipPayment from '../screens/tabs/Profile/MembershipPayment';

import AddProduct from '../screens/tabs/Seller/AddProduct';
import Products from '../screens/tabs/Seller/Products';
import ProductDetail from '../screens/tabs/Seller/ProductDetail';

import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {wp} from '../helpers/Responsiveness';
import Color from '../theme/Color';
import Font from '../theme/Fonts';

import {connect} from 'react-redux';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="SubCategories" component={SubCategories} />
      <Stack.Screen name="CategoryDetail" component={CategoryDetail} />
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
    <Stack.Navigator headerMode="none" initialRouteName="Products">
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );
}

function MyTabs(props) {
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
                <View>
                  <Feather name="shopping-cart" size={24} color={color} />
                  {props.cart.length != 0 && (
                    <View
                      style={{
                        position: 'absolute',
                        backgroundColor: '#F11010',
                        top: -wp(1),
                        right: -wp(2),
                        height: wp(4.5),
                        width: wp(4.5),
                        borderRadius: wp(4.5),
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1.5,
                        borderColor: '#fff',
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 10,
                          fontWeight: 'bold',
                        }}>
                        {props.cart.length}
                      </Text>
                    </View>
                  )}
                </View>
              );
            }
          },
        }}
      />

      {props.seller && (
        <Tab.Screen
          name="AddProduct"
          component={ProductStack}
          options={{
            tabBarIcon: ({color, focused}) => {
              if (focused) {
                return (
                  <View>
                    <Text style={{color: color, fontFamily: Font.SFProText}}>
                      Products
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
                return <Feather name="shopping-bag" size={24} color={color} />;
              }
            },
          }}
          // options={{
          //   tabBarIcon: ({color, focused}) => {
          //     return (
          //       <View
          //         style={{
          //           height: wp(13),
          //           width: wp(13),
          //           borderRadius: wp(13),
          //           justifyContent: 'center',
          //           alignItems: 'center',
          //           backgroundColor: Color.primary,
          //           borderWidth: wp(1),
          //           borderColor: '#fff',
          //           marginTop: -wp(5),
          //         }}>
          //         <Entypo name="plus" size={wp(8)} color="#fff" />
          //       </View>
          //     );
          //   },
          // }}
        />
      )}
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
      {props.seller ? (
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
      ) : (
        <Tab.Screen
          name="Seller"
          component={Seller}
          options={{
            tabBarIcon: ({color, focused}) => {
              return (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                      marginRight: wp(1),
                      fontFamily: Font.SFProText,
                      fontSize: wp(3.8),
                    }}>
                    Seller
                  </Text>
                  <Feather name="tag" size={wp(4)} color="black" />
                </View>
              );
            },
            tabBarVisible: false,
          }}
        />
      )}
    </Tab.Navigator>
  );
}

const mapStateToProps = ({cartItems,authReducer}) => {
  return {
    cart: cartItems.cart,
    seller: authReducer.seller
  };
};

export default connect(mapStateToProps)(MyTabs);
