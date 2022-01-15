import React from 'react';
import {ScrollView} from 'react-native';
import OrderItem from './OrderItem';

const New = (props) => {
  return (
    <ScrollView style={styles.container}>
      <OrderItem
        New
        onPress={() => props.navigation.navigate('OrderDetail', {type: 'New'})}
      />
      <OrderItem
        New
        onPress={() => props.navigation.navigate('OrderDetail', {type: 'New'})}
      />
    </ScrollView>
  );
};

export default New;

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
};
