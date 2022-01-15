import React from 'react';
import {ScrollView} from 'react-native';
import OrderItem from './OrderItem';

const Ongoing = (props) => {
  return (
    <ScrollView style={styles.container}>
      <OrderItem
        Ongoing
        onPress={() => props.navigation.navigate('OrderDetail', {type: 'Ongoing'})}
      />
      <OrderItem
        Ongoing
        onPress={() => props.navigation.navigate('OrderDetail', {type: 'Ongoing'})}
      />
    </ScrollView>
  );
};

export default Ongoing;

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
};
