import React, {useState, useEffect} from 'react';
import {Text, View, Modal, ScrollView, TouchableOpacity} from 'react-native';
import Header from '../../../components/Header';
import Fonts from '../../../theme/Fonts';
import Color from '../../../theme/Color';
import {wp} from '../../../helpers/Responsiveness';
import SolidButton from '../../../components/SolidButton';
import Feather from 'react-native-vector-icons/Feather';
import OutlineButton from '../../../components/OutlineButton';
import {getPlan, setPlan} from '../../../redux/User/discount/actions';
import {connect} from 'react-redux';
import moment from 'moment';
const Membership = ({
  navigation,
  token,
  loading,
  currentPlan,
  reduxGetPlan,
  reduxSetPlan,
}) => {
  const [plan, setPlan] = useState('MONTHLY');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    reduxGetPlan(token);
  }, []);
  const buyMembership = () => {
    reduxSetPlan(plan, token);
    setModalVisible(!modalVisible);
  };
  return (
    <View style={styles.container}>
      <Header
        back
        backCall={() => navigation.goBack()}
        title="Membership Plans"
      />

      {typeof currentPlan?.membership === 'object' &&
      Object.keys(currentPlan?.membership).length > 0 ? (
        <>
          <View
            style={{
              width: wp(100),
              paddingHorizontal: wp(10),
              marginTop: wp(5),
            }}>
            <Text style={styles.heading}>Membership Plan Info</Text>
          </View>
          <View
            style={{
              width: wp(100),
              height: 0.5,
              backgroundColor: 'gray',
              marginTop: wp(5),
            }}
          />
          <View
            style={{
              width: wp(100),
              paddingHorizontal: wp(10),
              marginTop: wp(5),
            }}>
            <Text style={styles.subHeading}>
              Plan: {currentPlan?.membership?.plan}
            </Text>
            <Text style={styles.subHeading}>
              Start date: {moment(currentPlan?.membership?.start).format('ll')}
            </Text>
            <Text style={styles.subHeading}>
              End date: {moment(currentPlan?.membership?.end).format('ll')}
            </Text>
          </View>
          <View
            style={{
              width: wp(100),
              height: 0.5,
              backgroundColor: 'gray',
              marginTop: wp(5),
            }}
          />
          <View
            style={{
              width: wp(100),
              paddingHorizontal: wp(10),
              marginTop: wp(5),
            }}>
            <View style={styles.row}>
              <Feather name="check" size={24} color={Color.primary} />
              <Text style={{...styles.subHeading, marginLeft: wp(2)}}>
                10% offer on per product to buy
              </Text>
            </View>
            <View style={styles.row}>
              <Feather name="check" size={24} color={Color.primary} />
              <Text style={{...styles.subHeading, marginLeft: wp(2)}}>
                20% per product on sell
              </Text>
            </View>
          </View>

          <View
            style={{
              width: wp(100),
              height: 0.5,
              backgroundColor: 'gray',
              marginTop: wp(5),
            }}
          />
        </>
      ) : (
        <ScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: wp(10), alignItems: 'center'}}>
          <View style={styles.block}>
            <Text style={styles.heading}>Choose A Membership Plan</Text>
            <View style={styles.row}>
              <Text style={styles.subHeading}>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                used in laying out print, graphic or web designs.
              </Text>
            </View>

            <View style={{marginTop: wp(5)}}>
              <View style={styles.row}>
                <Feather name="check" size={24} color={Color.primary} />
                <Text style={{...styles.subHeading, marginLeft: wp(2)}}>
                  10% offer on per product to buy
                </Text>
              </View>
              <View style={styles.row}>
                <Feather name="check" size={24} color={Color.primary} />
                <Text style={{...styles.subHeading, marginLeft: wp(2)}}>
                  20% per product on sell
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => setPlan('MONTHLY')}
              style={
                plan === 'MONTHLY' ? styles.activeTab : styles.inactiveTab
              }>
              <Text
                style={
                  plan === 'MONTHLY'
                    ? styles.activeTabText
                    : styles.inactiveTabText
                }>
                MONTHLY
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPlan('ANNUAL')}
              style={plan === 'ANNUAL' ? styles.activeTab : styles.inactiveTab}>
              <Text
                style={
                  plan === 'ANNUAL'
                    ? styles.activeTabText
                    : styles.inactiveTabText
                }>
                ANNUAL
              </Text>
            </TouchableOpacity>
          </View>

          {plan === 'MONTHLY' && (
            <View style={styles.card}>
              <Text style={{fontFamily: Fonts.SFProText}}>1 Month Plan</Text>
              <Text
                style={{
                  fontFamily: Fonts.SFProDisplayBold,
                  fontSize: wp(8),
                  color: Color.primary,
                }}>
                $10
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.SFProDisplay,
                  fontSize: wp(3),
                  color: Color.primary,
                  marginTop: -wp(3),
                }}>
                Per Month
              </Text>
              <Text style={{fontFamily: Fonts.SFProText, textAlign: 'center'}}>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                used in laying out print, graphic or web designs.
              </Text>
              <OutlineButton
                placeholder="SUBSCRIBE"
                width={40}
                height={12}
                textStyle={styles.inactiveTabText}
                style={{borderColor: Color.primary, borderWidth: wp(0.4)}}
                onClick={() => setModalVisible(!modalVisible)}
              />
            </View>
          )}

          {plan === 'ANNUAL' && (
            <View style={styles.card}>
              <Text style={{fontFamily: Fonts.SFProText}}>Annual Plan</Text>
              <Text
                style={{
                  fontFamily: Fonts.SFProDisplayBold,
                  fontSize: wp(8),
                  color: Color.primary,
                }}>
                $90
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.SFProDisplay,
                  fontSize: wp(3),
                  color: Color.primary,
                  marginTop: -wp(3),
                }}>
                Per Year
              </Text>
              <Text style={{fontFamily: Fonts.SFProText, textAlign: 'center'}}>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                used in laying out print, graphic or web designs.
              </Text>
              <SolidButton
                placeholder="SUBSCRIBE"
                width={40}
                height={12}
                textStyle={styles.activeTabText}
                style={{backgroundColor: Color.primary}}
                onClick={() => setModalVisible(!modalVisible)}
              />
            </View>
          )}
        </ScrollView>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={{...styles.card, height: wp(65), width: wp(90)}}>
            <Text style={{fontFamily: Fonts.SFProText}}>
              {' '}
              {plan === 'MONTHLY' ? 'Monthly Plan' : 'Annual Plan'}
            </Text>
            <Text
              style={{
                fontFamily: Fonts.SFProDisplayBold,
                fontSize: wp(8),
                color: Color.primary,
              }}>
              {plan === 'MONTHLY' ? '$10' : '$90'}
            </Text>
            <Text
              style={{
                fontFamily: Fonts.SFProDisplay,
                fontSize: wp(3),
                color: Color.primary,
                marginTop: -wp(3),
              }}>
              {plan === 'MONTHLY' ? ' Per Month' : ' Per Year'}
            </Text>
            <Text style={{fontFamily: Fonts.SFProText, textAlign: 'center'}}>
              {plan === 'MONTHLY'
                ? ' Are you sure to pay your monthly fee for this subscription'
                : ' Are you sure to pay your annual fee for this subscription'}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: wp(75),
              }}>
              <OutlineButton
                placeholder="CANCEL"
                width={35}
                height={12}
                textStyle={{
                  ...styles.inactiveTabText,
                  fontSize: wp(3.8),
                  color: Color.secondary,
                }}
                style={{borderColor: Color.secondary}}
                onClick={() => setModalVisible(!modalVisible)}
              />
              <SolidButton
                placeholder="PROCEED PAY"
                width={35}
                height={12}
                textStyle={{...styles.activeTabText, fontSize: wp(3.8)}}
                style={{backgroundColor: Color.secondary}}
                onClick={buyMembership}
                loading={loading}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    loading: state.discountReducer.loading,
    currentPlan: state.discountReducer.plan,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxGetPlan: (token) => dispatch(getPlan(token)),
    reduxSetPlan: (plan, token) => dispatch(setPlan(plan, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Membership);
const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  block: {
    width: wp(100),
    paddingHorizontal: wp(5),
    paddingBottom: wp(5),
    marginVertical: wp(6),
    borderBottomWidth: wp(0.5),
    borderBottomColor: '#f5f5f5',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: wp(3),
  },
  heading: {
    fontSize: wp(5),
    fontFamily: Fonts.SFProDisplayBold,
    color: Color.primary,
  },
  subHeading: {
    fontSize: wp(3.8),
    fontFamily: Fonts.SFProDisplay,
    alignSelf: 'flex-start',
  },
  switchStyle: {
    backgroundColor: '#fff',
    height: wp(6.5),
    width: wp(11),
    borderRadius: wp(100),
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(5),
  },
  card: {
    height: wp(70),
    width: wp(75),
    backgroundColor: '#fff',
    elevation: 3,
    margin: 3,
    borderRadius: wp(3),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingVertical: wp(4),
    marginTop: wp(10),
  },
  tabContainer: {
    borderWidth: wp(0.3),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp(100),
    borderColor: Color.primary,
  },
  activeTab: {
    backgroundColor: Color.primary,
    width: wp(35),
    height: wp(12),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(100),
  },
  activeTabText: {
    fontSize: wp(4),
    fontFamily: Fonts.SFProDisplayBold,
    color: '#fff',
  },
  inactiveTab: {
    backgroundColor: '#fff',
    width: wp(35),
    height: wp(12),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(100),
  },
  inactiveTabText: {
    fontSize: wp(4),
    fontFamily: Fonts.SFProDisplayBold,
    color: Color.primary,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
};
