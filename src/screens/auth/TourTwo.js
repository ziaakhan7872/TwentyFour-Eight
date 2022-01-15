import React from 'react';
import {
  View,
  Image,
  StatusBar,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import Color from '../../theme/Color';
import {wp} from '../../helpers/Responsiveness';
import Entypo from 'react-native-vector-icons/Entypo';
import Fonts from '../../theme/Fonts'
const TourTwo = ({navigation}) => {
  return (
    <>
      <StatusBar backgroundColor={Color.background} barStyle="dark-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: Color.background}}>
        <View style={styles.container}>
          <Image
            source={require('../../assets/images/tourTwo.png')}
            style={{height: wp(55), width: wp(60),resizeMode:'contain'}}
          />

          <View>
            <Text style={styles.heading}>
              Acquire new customers{'\n'}from anywhere
            </Text>

            <Text style={styles.subHeading}>
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic.
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={styles.blackButton}>
            <Entypo name="chevron-thin-right" size={wp(5)} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default TourTwo;

const styles = {
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: wp(25),
    paddingHorizontal: wp(10),
    backgroundColor: Color.background,
  },
  heading: {
    fontSize: wp(5.2),
    fontFamily:Fonts.SFProDisplayBold,
    color: Color.primary,
    textAlign: 'center',
    marginBottom: wp(4),
  },
  subHeading: {
    fontSize: wp(3.7),
    fontFamily:Fonts.SFProDisplay,
    color: Color.secondary,
    lineHeight: wp(6),
    textAlign:'center'
  },
  blackButton: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    height: wp(10),
    width: wp(10),
    borderRadius: wp(10),
  },
};
