import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Colors from '../../../theme/Color';
import Fonts from '../../../theme/Fonts';
import {wp} from '../../../helpers/Responsiveness';
import InputField from '../../../components/InputField';
import SolidButton from '../../../components/SolidButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import CountryPicker from 'react-native-country-picker-modal';
import {connect} from 'react-redux';
import {
  getCategories,
  registerBusiness,
} from '../../../redux/Business/Register/actions';

const BusinessRegistration = ({
  navigation,
  route,
  categories,
  token,
  reduxRegisterBusiness,
  reduxGetCategories,
  message,
}) => {
  const [businessName, setBusinessName] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [startHours, setStartHours] = useState('');
  const [startHoursClock, setStartHoursClock] = useState(false);
  const [endHours, setEndHours] = useState('');
  const [endHoursClock, setEndHoursClock] = useState(false);
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('+92');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');

  const [categoriesList, setCategoriesList] = useState([]);
  const [subCategoriesList, setSubCategoriesList] = useState([]);

  const [countryCode, setCountryCode] = useState('PK');
  const [withFlag, setWithFlag] = useState(true);
  const [withFilter] = useState(true);
  const [withAlphaFilter] = useState(true);
  const [withCallingCode] = useState(true);
  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCode(`+${country.callingCode[0]}`);
  };

  const REGISTER = () => {
    if (
      (businessName,
      address,
      categoryId,
      subCategory,
      startHours,
      endHours,
      email,
      bio,
      phone,
      website)
    ) {
      reduxRegisterBusiness(
        {
          name: businessName,
          address: address,
          category: categoryId,
          subCategory: subCategory,
          start: startHours,
          end: endHours,
          email: email,
          description: bio,
          phone: code + phone,
          website: website,
          image: route.params.businessInfo.image,
        },
        token,
      );
      navigation.navigate('BottomTabs');
    } else {
      ToastAndroid.show('All fields are mandatory', 500);
    }
  };

  useEffect(() => {
    reduxGetCategories();
  }, []);

  useEffect(() => {
    setCategoriesList(categories.map((item, index) => item.name));
  }, [categories]);

  useEffect(() => {
    setSubCategory('');
    const arr = categories.filter((c) => {
      if (c.name == category) {
        setCategoryId(c._id);
        setSubCategoriesList(c.subCategories);
        return 0;
      }
    });
  }, [category]);

  const onChangeStart = (event, selectedDate) => {
    setStartHoursClock(false);
    setStartHours(moment(selectedDate).format('LT'));
  };
  const onChangeEnd = (event, selectedDate) => {
    setEndHoursClock(false);
    setEndHours(moment(selectedDate).format('LT'));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollStyle}
        contentContainerStyle={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Business detail</Text>

        <InputField
          placeholder="Business Name"
          value={businessName}
          onChangeText={setBusinessName}
        />

        <InputField
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          style={{marginTop: wp(2)}}
        />

        <InputField
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
          style={{marginTop: wp(2)}}
          dropDown
          dropDownList={categoriesList}
        />

        <InputField
          placeholder="Sub-category"
          value={subCategory}
          onChangeText={setSubCategory}
          style={{marginTop: wp(2)}}
          dropDown
          dropDownList={subCategoriesList}
        />

        <View style={styles.row}>
          <TouchableOpacity onPress={() => setStartHoursClock(true)}>
            <InputField
              placeholder="Start Hours"
              value={startHours}
              onChangeText={setStartHours}
              editable={false}
              style={{marginTop: wp(2), width: wp(35)}}
            />
          </TouchableOpacity>
          {startHoursClock && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChangeStart}
            />
          )}
          <TouchableOpacity onPress={() => setEndHoursClock(true)}>
            <InputField
              placeholder="End Hours"
              value={endHours}
              onChangeText={setEndHours}
              editable={false}
              style={{marginTop: wp(2), width: wp(35)}}
            />
          </TouchableOpacity>

          {endHoursClock && (
            <DateTimePicker
              testID="dateTimePicker1"
              value={new Date()}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChangeEnd}
            />
          )}
        </View>

        <InputField
          placeholder="Description/Bio"
          value={bio}
          onChangeText={setBio}
          style={{marginTop: wp(2)}}
        />

        <InputField
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{marginTop: wp(2)}}
        />
        <View style={styles.row}>
          <CountryPicker
            {...{
              countryCode,
              withFilter,
              withFlag,
              withAlphaFilter,
              withCallingCode,
              onSelect,

              containerButtonStyle: {
                borderBottomColor: Colors.primary,
                borderBottomWidth: 1.3,
                height: wp(10),
                width: wp(10),
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: -5,
              },
            }}
          />

          <InputField
            value={code}
            onChangeText={setCode}
            style={{marginTop: wp(2), width: wp(12)}}
          />

          <InputField
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
            style={{marginTop: wp(2), width: wp(50)}}
          />
        </View>

        <InputField
          placeholder="Website"
          value={website}
          onChangeText={setWebsite}
          style={{marginTop: wp(2)}}
        />
        <Text style={{marginTop: wp(4)}}>{message}</Text>
        <SolidButton
          placeholder="REGISTER"
          style={{marginVertical: wp(7)}}
          onClick={REGISTER}
          bold
        />
      </ScrollView>
    </View>
  );
};
const mapStateToProps = ({businessRegistrationReducer, authReducer}) => {
  return {
    categories: businessRegistrationReducer.categories,
    token: authReducer.token,
    message: businessRegistrationReducer.businessMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxGetCategories: () => dispatch(getCategories()),
    reduxRegisterBusiness: (business, token) =>
      dispatch(registerBusiness(business, token)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BusinessRegistration);

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  scrollStyle: {
    flex: 1,
    width: wp(100),
  },
  heading: {
    fontSize: wp(3.5),
    fontFamily: Fonts.SFProDisplayBold,
    width: wp(85),
    marginBottom: wp(5),
    marginTop: wp(18),
  },
  loginButton: {
    position: 'absolute',
    top: wp(4),
    right: wp(8),
  },
  loginText: {
    fontSize: wp(3.6),
    color: Colors.primary,
    fontFamily: Fonts.SFProDisplayMedium,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(82),
  },
};
