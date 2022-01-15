import React, {useState} from 'react';
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import Header from '../../../components/Header';
import Fonts from '../../../theme/Fonts';
import Color from '../../../theme/Color';
import {wp} from '../../../helpers/Responsiveness';
import SolidButton from '../../../components/SolidButton';
import OutlineButton from '../../../components/OutlineButton';
import Input from '../../../components/Input';
import Feather from 'react-native-vector-icons/Feather';

const MembershipPayment = ({navigation}) => {
  const [saveCard, toggleSaveCard] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Header back backCall={() => navigation.goBack()} title="Payment" />

      <ScrollView style={{flex: 1}}>
        <Input
          placeholder="Name on Card"
          placeHolderStyle={{color: Color.primary}}
        />
        <Input
          placeholder="Card Number"
          placeHolderStyle={{color: Color.primary}}
        />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Input
            placeholder="Expiry Date"
            placeHolderStyle={{color: Color.primary}}
          />
          <Input placeholder="CVV" placeHolderStyle={{color: Color.primary}} />
        </View>

        <View style={{...styles.row, marginTop: wp(8),marginBottom:wp(20)}}>
          {saveCard ? (
            <TouchableOpacity
              onPress={() => toggleSaveCard(false)}
              style={styles.check}>
              <Feather name="check" size={wp(5)} color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => toggleSaveCard(true)}
              style={styles.checkO}
            />
          )}
          <Text style={styles.subHeading}>Save this card details</Text>
        </View>
      </ScrollView>
      <View style={styles.buttonRow}>
        <OutlineButton
          onClick={() => navigation.goBack()}
          placeholder="BACK"
          width={40}
        />
        <SolidButton
          onClick={() => {
            setModalVisible(!modalVisible)
            setTimeout(() => {
              setModalVisible(false)
              navigation.navigate('SellerBottomTabs')
            }, 100);
          }}
          placeholder="PROCEED PAY"
          width={40}
          bold
        />
      </View>
      <Modal
        animationType="none"
        transparent={true}
        statusBarTranslucent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableWithoutFeedback
          onPress={() => setModalVisible(!modalVisible)}
          style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.3)',
            }}>
            <View style={{...styles.card, height: wp(65), width: wp(90)}}>
              <Text
                style={{
                  fontSize: wp(3.5),
                  fontFamily: Fonts.SFProText,
                  textAlign: 'center',
                  width: wp(60),
                }}>
                You have successful Subscribe Annual plan
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.SFProDisplayBold,
                  fontSize: wp(8),
                  color: Color.primary,
                }}>
                Thank you
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default MembershipPayment;

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    height: wp(70),
    width: wp(75),
    backgroundColor: '#fff',
    elevation: 3,
    margin: 3,
    borderRadius: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingVertical: wp(4),
    marginTop: wp(10),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(5),
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#F8F8FA',
    paddingVertical: wp(6),
  },
  activePaymentCheck: {
    height: wp(12),
    width: wp(25),
    borderRadius: wp(2),
    borderWidth: wp(0.3),
    borderColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentCheck: {
    height: wp(12),
    width: wp(25),
    borderRadius: wp(2),
    borderWidth: wp(0.3),
    borderColor: '#8A8A8F',
    justifyContent: 'center',
    alignItems: 'center',
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
  heading: {
    fontSize: wp(4),
    fontFamily: Fonts.SFProDisplay,
    fontWeight: '700',
    color: '#000000',
    marginLeft: wp(4),
    marginTop: wp(8),
    marginBottom: wp(4),
  },
  subHeading: {
    fontSize: wp(3.8),
    fontFamily: Fonts.SFProDisplay,
    color: '#000000',
    width: wp(80),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: wp(2),
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
};
