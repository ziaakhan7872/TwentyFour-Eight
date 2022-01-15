import React, {useState} from 'react';
import {TouchableOpacity, Text, View, StatusBar, TextInput} from 'react-native';
import {wp} from '../helpers/Responsiveness';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Color from '../theme/Color';
import Font from '../theme/Fonts';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Header = ({
  back,
  backCall,
  title,
  search,
  searchCall,
  plain,
  locationPin,
  onSearch,
}) => {
  const [ShowSearch, setShowSearch] = useState(false);
  return (
    <View style={plain ? styles.plainContainer : styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <TouchableOpacity onPress={backCall} style={styles.backButton}>
        {back && (
          <AntDesign name="arrowleft" size={wp(6)} color={Color.secondary} />
        )}
      </TouchableOpacity>

      {ShowSearch ? (
        <>
          <TextInput
            placeholder="Search.."
            onChangeText={onSearch}
            style={{
              borderWidth: 1,
              borderRadius: 2,
              borderColor: '#ededed',
              width: wp(70),
              paddingVertical: 3,
              paddingHorizontal: wp(4),
              backgroundColor: '#f9f9f9',
            }}
            autoFocus={true}
          />
          <TouchableOpacity
            onPress={() => setShowSearch(false)}
            style={styles.searchButton}>
            <MaterialIcons
              name="cancel"
              size={wp(5.5)}
              color={Color.secondary}
            />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.textCon}>
            <Text style={styles.text}>{title}</Text>
          </View>

          {locationPin ? (
            <View style={styles.location}>
              <SimpleLineIcons name="location-pin" size={wp(5)} color="#fff" />
            </View>
          ) : search ? (
            <TouchableOpacity
              onPress={() => setShowSearch(true)}
              style={styles.searchButton}>
              <AntDesign
                name="search1"
                size={wp(5.5)}
                color={Color.secondary}
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.searchButton} />
          )}
        </>
      )}
    </View>
  );
};

export default Header;

const styles = {
  container: {
    backgroundColor: '#fff',
    width: wp(100),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
  },
  plainContainer: {
    backgroundColor: '#fff',
    width: wp(100),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    height: wp(15),
    width: wp(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCon: {
    height: wp(15),
    width: wp(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: wp(4.2),
    fontFamily: Font.SFProTextSemibold,
    width: wp(65),
    textAlign: 'center',
  },
  searchButton: {
    height: wp(15),
    width: wp(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  location: {
    height: wp(10),
    width: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.primary,
    borderRadius: wp(15),
    marginRight: wp(5),
  },
};
