import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// Screens
import OnBoard from './OnBoard';
import BusinessRegistration from './BusinessRegistration';
import SellerBottomTabs from './SellerBottomTabs';

import Membership from '../Profile/Membership';
import MembershipPayment from '../Profile/MembershipPayment';

const Stack = createStackNavigator();

export default function SellerStack() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="OnBoard">
      <Stack.Screen name="OnBoard" component={OnBoard} />
      <Stack.Screen
        name="BusinessRegistration"
        component={BusinessRegistration}
      />
      <Stack.Screen name="Membership" component={Membership} />
      <Stack.Screen
        name="MembershipPayment"
        component={MembershipPayment}
      />
      <Stack.Screen name="SellerBottomTabs" component={SellerBottomTabs} />
    </Stack.Navigator>
  );
}
