import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Header from '../../../components/Header';
import Color from '../../../theme/Color';
import Fonts from '../../../theme/Fonts';
import {wp} from '../../../helpers/Responsiveness';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SolidButton from '../../../components/SolidButton';
import {PickImage} from '../../../helpers/Images';
import {connect} from 'react-redux';
import {getProfile, updateProfile} from '../../../redux/User/profile/actions';
const EditProfile = ({
  navigation,
  route,
  token,
  loading,
  reduxUpdateProfile,
}) => {
  const profile = route.params?.profile;
  console.log(profile);
  const [edit, toggleEdit] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState('');

  const handleImagePicker = () => {
    PickImage((img) => {
      setImage(img.uri);
    });
  };
  useEffect(() => {
    setImage(profile.profile_image);
    setPhone(profile.phone);
    setName(profile.name);
    setEmail(profile.email);
    setAddress(
      `${profile.address.House}, ${profile.address.Street}, ${profile.address.City}, ${profile.address.State}, ${profile.address.Country}.`,
    );
  }, []);

  const updateProfile = () => {
    reduxUpdateProfile(token, {
      name,
      phone,
      email,
      address,
      image,
    });
  };

  // useEffect(() => {
  //   if (loading) {
  //     toggleEdit(!edit);
  //   }
  // }, [loading]);

  return (
    <View style={styles.container}>
      <Header
        back
        backCall={() => navigation.goBack()}
        title="Edit Profile"
        plain
      />
      <ScrollView style={{flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => toggleEdit(!edit)}
            style={styles.editButton}>
            <Feather name="edit" size={wp(6)} color="black" />
          </TouchableOpacity>

          <Image
            source={{
              uri: image
                ? image
                : 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80',
            }}
            style={styles.imageStyle}
          />
          {edit ? (
            <TouchableOpacity onPress={handleImagePicker}>
              <Text style={styles.choose}>Choose Image</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.heading}>{profile.name}</Text>
          )}
        </View>

        <View style={styles.form}>
          <View style={styles.inputRow}>
            <View style={styles.editIcon}>
              <Ionicons
                name="ios-person-add"
                size={wp(6)}
                color={Color.primary}
              />
            </View>
            <View>
              <Text style={styles.inputPlaceholder}>Full Name</Text>
              <TextInput
                editable={edit ? true : false}
                value={name}
                onChangeText={setName}
                style={[
                  styles.inputStyle,
                  {borderBottomWidth: edit ? wp(0.4) : 0},
                ]}
              />
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={styles.editIcon}>
              <FontAwesome name="phone" size={wp(6)} color={Color.primary} />
            </View>
            <View>
              <Text style={styles.inputPlaceholder}>Phone</Text>
              <TextInput
                editable={edit ? true : false}
                value={phone}
                onChangeText={setPhone}
                style={[
                  styles.inputStyle,
                  {borderBottomWidth: edit ? wp(0.4) : 0},
                ]}
              />
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={styles.editIcon}>
              <MaterialIcons name="email" size={wp(6)} color={Color.primary} />
            </View>
            <View>
              <Text style={styles.inputPlaceholder}>Email</Text>
              <TextInput
                editable={edit ? true : false}
                value={email}
                onChangeText={setEmail}
                style={[
                  styles.inputStyle,
                  {borderBottomWidth: edit ? wp(0.4) : 0},
                ]}
              />
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={styles.editIcon}>
              <MaterialIcons
                name="location-on"
                size={wp(6)}
                color={Color.primary}
              />
            </View>
            <View>
              <Text style={styles.inputPlaceholder}>Address</Text>
              <TextInput
                editable={false}
                multiline={true}
                value={address}
                onChangeText={setAddress}
                style={[
                  styles.inputStyle,
                  {
                    borderBottomWidth: edit ? wp(0.4) : 0,
                    width: edit ? wp(62) : wp(68),
                  },
                ]}
              />
            </View>
            {edit && (
              <TouchableOpacity
                onPress={() => navigation.navigate('Address', {profile: true})}
                style={styles.editButton}>
                <Feather name="edit" size={wp(4)} color="black" />
              </TouchableOpacity>
            )}
          </View>

          {edit && (
            <SolidButton
              onClick={updateProfile}
              placeholder="Update Profile"
              style={styles.updateButton}
              loading={loading}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = ({authReducer, profileReducer}) => {
  return {
    token: authReducer.token,
    profile: profileReducer.profile,
    loading: profileReducer.profileLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxGetProfile: (token) => dispatch(getProfile(token)),
    reduxUpdateProfile: (token, profile) =>
      dispatch(updateProfile(token, profile)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    width: wp(100),
    height: wp(45),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    height: wp(22),
    width: wp(22),
    borderRadius: wp(5),
  },
  heading: {
    fontSize: wp(6),
    fontFamily: Fonts.SFProText,
  },
  choose: {
    fontSize: wp(4),
    fontFamily: Fonts.SFProText,
    marginTop: wp(2),
  },
  editButton: {
    height: wp(8),
    width: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: wp(5),
  },
  form: {
    flex: 1,
    width: wp(100),
    paddingHorizontal: wp(8),
    backgroundColor: '#fff',
    borderTopLeftRadius: wp(8),
    elevation: 5,
    marginTop: wp(5),
  },
  inputRow: {
    flexDirection: 'row',
    width: wp(85),
    marginTop: wp(10),
  },
  editIcon: {
    height: wp(11),
    width: wp(11),
    borderRadius: wp(3),
    backgroundColor: '#F9F3EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputPlaceholder: {
    fontSize: wp(3.5),
    fontFamily: Fonts.SFProDisplayMedium,
    color: Color.primary,
    marginLeft: wp(3),
  },
  inputStyle: {
    marginLeft: wp(3),
    paddingVertical: wp(0),
    fontSize: wp(3.6),
    fontFamily: Fonts.SFProDisplayMedium,
    width: wp(68),
    color: '#000',
    paddingBottom: wp(0.5),
    borderBottomColor: Color.primary,
  },
  updateButton: {
    alignSelf: 'center',
    marginVertical: wp(15),
  },
};
