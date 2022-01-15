import React from 'react';
import {ScrollView} from 'react-native';
import OrderItem from './OrderItem';

const Past = (props) => {
  return (
    <ScrollView style={styles.container}>
      <OrderItem
        Past
        onPress={() => props.navigation.navigate('OrderDetail', {type: 'Past'})}
      />
      <OrderItem
        Past
        onPress={() => props.navigation.navigate('OrderDetail', {type: 'Past'})}
      />
    </ScrollView>
  );
};

export default Past;

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
};
