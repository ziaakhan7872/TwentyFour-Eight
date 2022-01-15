import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabs from './BottomTabs';

//Initial Screens
import Splash from '../screens/auth/Splash';
import TourOne from '../screens/auth/TourOne';
import TourTwo from '../screens/auth/TourTwo';

//Auth Screens
import Register from '../screens/auth/Register';
import Login from '../screens/auth/Login';
import Forgot from '../screens/auth/Forgot';
import Search from '../screens/tabs/Home/Search';
import Detail from '../screens/tabs/Home/Detail';
import ChangePassword from '../screens/auth/ChangePassword';

//Cart Screens
import Delivery from '../screens/tabs/Cart/Delivery';
import Address from '../screens/tabs/Cart/Address';
import Payment from '../screens/tabs/Cart/Payment';
import OrderSummary from '../screens/tabs/Cart/OrderSummary';

//Profile Screens
import Wishlist from '../screens/tabs/Profile/Wishlist';
import Support from '../screens/tabs/Profile/Support';
import MembershipPayment from '../screens/tabs/Profile/MembershipPayment';
import Cards from '../screens/tabs/Profile/Cards';
import AddCard from '../screens/tabs/Profile/AddCard';
import Terms from '../screens/auth/Terms';

import {connect} from 'react-redux';

const Stack = createStackNavigator();
function ChoiceNavigator({firstLaunch, token}) {
  return (
    <Stack.Navigator headerMode="none">
      {firstLaunch && (
        <>
          <Stack.Screen name="TourOne" component={TourOne} />
          <Stack.Screen name="TourTwo" component={TourTwo} />
        </>
      )}
      {token ? (
        <>
          <Stack.Screen name="BottomTabs" component={BottomTabs} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Detail" component={Detail} />
          <Stack.Screen name="Cards" component={Cards} />
          <Stack.Screen name="AddCard" component={AddCard} />
          <Stack.Screen name="Delivery" component={Delivery} />
          <Stack.Screen name="Address" component={Address} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="OrderSummary" component={OrderSummary} />
          <Stack.Screen
            name="MembershipPayment"
            component={MembershipPayment}
          />
          <Stack.Screen name="Wishlist" component={Wishlist} />
          <Stack.Screen name="Support" component={Support} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Terms" component={Terms} />
          <Stack.Screen name="Forgot" component={Forgot} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
        </>
      )}
    </Stack.Navigator>
  );
}

function MainNavigator(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {props.splash && <Stack.Screen name="Splash" component={Splash} />}
        <Stack.Screen name="App" component={ChoiceNavigator} {...props} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const mapStateToProps = ({splashReducer, walkThroughReducer, authReducer}) => {
  return {
    splash: splashReducer.splash,
    firstLaunch: walkThroughReducer.firstLaunch,
    token: authReducer.token,
  };
};

export default connect(mapStateToProps)(MainNavigator);
