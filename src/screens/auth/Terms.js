import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../../components/Header';
import {WebView} from 'react-native-webview';
const Terms = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header
        back
        backCall={() => navigation.goBack()}
        title="Terms & Conditions"
      />
      <WebView source={{uri: 'https://www.twentyfoureight.com/'}} />
    </View>
  );
};

export default Terms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
