import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import Header from '../../../components/Header';
import Fonts from '../../../theme/Fonts';
import Color from '../../../theme/Color';
import {wp} from '../../../helpers/Responsiveness';
import CheckoutTray from '../../../components/CheckoutTray';
import SolidButton from '../../../components/SolidButton';
import OutlineButton from '../../../components/OutlineButton';
import Feather from 'react-native-vector-icons/Feather';
import Input from '../../../components/Input';
import {connect} from 'react-redux';
import {getAddress, setAddress} from '../../../redux/User/profile/actions';

const Address = ({
  navigation,
  route,
  token,
  reduxGetAddress,
  reduxSetAddress,
  address,
  loading,
}) => {
  const deliveryType = route.params?.deliveryType;
  const profile = route.params?.profile;
  const [House, setHouse] = useState('');
  const [Street, setStreet] = useState('');
  const [City, setCity] = useState('');
  const [State, setState] = useState('');
  const [Country, setCountry] = useState('');
  const [saveAddress, setSaveAddress] = useState(false);

  useEffect(() => {
    setHouse(address?.House);
    setStreet(address?.Street);
    setCity(address?.City);
    setState(address?.State);
    setCountry(address?.Country);
  }, [address]);

  useEffect(() => {
    reduxGetAddress(token);
  }, []);

  const next = () => {
    let newAddress = {
      House,
      Street,
      City,
      State,
      Country,
    };
    if (profile) {
      reduxSetAddress(newAddress, token);
    } else {
      if (
        typeof newAddress === 'object' &&
        Object.keys(newAddress).length > 0
      ) {
        if (saveAddress) {
          reduxSetAddress(newAddress, token);
        }
        navigation.navigate('Payment', {
          deliveryType: deliveryType ? deliveryType : 'Standard Delivery',
          CodeDiscount:
            route.params?.CodeDiscount == undefined
              ? 0
              : route.params?.CodeDiscount,
          address: `${House}, ${Street}, ${City}, ${State}, ${Country}.`,
        });
      } else {
        ToastAndroid.show('Address is mandatory', 1000);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Header
        back
        backCall={() => navigation.goBack()}
        title={profile ? 'Address' : 'Checkout'}
      />

      <ScrollView style={{flex: 1}}>
        {!profile && (
          <>
            <CheckoutTray
              delivery
              address
              deliveryPress={() => navigation.navigate('Delivery')}
              addressPress={() => navigation.navigate('Address')}
              paymentPress={() => navigation.navigate('Payment')}
            />

            <View style={{...styles.row, marginTop: wp(8)}}>
              <View style={styles.check}>
                <Feather name="check" size={wp(5)} color="#fff" />
              </View>
              <Text style={styles.subHeading}>
                Order will be delivered between 3 - 5 business days
              </Text>
            </View>
          </>
        )}

        {loading ? (
          <View style={{marginTop: wp(50)}}>
            <ActivityIndicator color="#000" size="small" />
          </View>
        ) : (
          <>
            <Input
              placeholder="House no"
              value={House}
              onChangeText={setHouse}
            />
            <Input
              placeholder="Street"
              value={Street}
              onChangeText={setStreet}
            />
            <Input placeholder="City" value={City} onChangeText={setCity} />

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Input
                placeholder="State"
                value={State}
                onChangeText={setState}
              />
              <Input
                placeholder="Country"
                value={Country}
                onChangeText={setCountry}
              />
            </View>
            {!profile && (
              <View style={{...styles.row, marginTop: wp(8)}}>
                {saveAddress ? (
                  <TouchableOpacity
                    onPress={() => setSaveAddress(false)}
                    style={styles.check}>
                    <Feather name="check" size={wp(5)} color="#fff" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => setSaveAddress(true)}
                    style={styles.checkO}
                  />
                )}
                <Text style={[styles.subHeading, {marginBottom: 12}]}>
                  Save this address details
                </Text>
              </View>
            )}
          </>
        )}

        {!loading && (
          <View style={styles.buttonRow}>
            {!profile && (
              <OutlineButton
                onClick={() => navigation.goBack()}
                placeholder="BACK"
                width={40}
              />
            )}
            <SolidButton
              onClick={next}
              placeholder={profile ? 'SAVE' : 'NEXT'}
              width={profile ? 80 : 40}
              loading={loading}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = ({authReducer, profileReducer}) => {
  console.log(profileReducer.address);
  return {
    token: authReducer.token,
    address: profileReducer.address,
    loading: profileReducer.profileLoading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    reduxGetAddress: (token) => dispatch(getAddress(token)),
    reduxSetAddress: (newAddress, token) =>
      dispatch(setAddress(newAddress, token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Address);

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(5),
  },
  check: {
    height: wp(6),
    width: wp(6),
    borderRadius: wp(6),
    backgroundColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(4),
  },
  heading: {
    fontSize: wp(4),
    fontFamily: Fonts.SFProDisplayMedium,
    color: '#000000',
  },
  subHeading: {
    fontSize: wp(3.8),
    fontFamily: Fonts.SFProDisplay,
    marginTop: wp(3),
    color: '#000000',
    width: wp(80),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: wp(10),
    backgroundColor: '#fff',
    paddingVertical: wp(3),
  },
  check: {
    height: wp(6),
    width: wp(6),
    borderRadius: wp(6),
    backgroundColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(4),
  },
  checkO: {
    height: wp(6),
    width: wp(6),
    borderRadius: wp(6),
    borderColor: '#d2d2d4',
    borderWidth: wp(0.5),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(4),
  },
};
