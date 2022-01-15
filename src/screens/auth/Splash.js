import React from 'react';
import {View, Image, StatusBar, SafeAreaView} from 'react-native';
import Color from '../../theme/Color';
import {wp} from '../../helpers/Responsiveness';
import {appLaunched} from '../../redux/Splash/actions';
import {connect} from 'react-redux'
const Splash = ({navigation, reduxAppLaunched}) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate('App');
      reduxAppLaunched();
    }, 1500);
    return () => {};
  }, []);

  return (
    <>
      <StatusBar backgroundColor={Color.secondary} barStyle="light-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: Color.secondary}}>
        <View style={styles.container}>
          <Image
            source={require('../../assets/images/icon.png')}
            style={{height: wp(50), width: wp(50)}}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxAppLaunched: () => dispatch(appLaunched()),
  };
};

export default connect(null, mapDispatchToProps)(Splash);

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.secondary,
  },
};
