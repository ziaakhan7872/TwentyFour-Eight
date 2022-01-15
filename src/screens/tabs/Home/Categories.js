import React, {useState,useEffect} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../../theme/Color';
import Font from '../../../theme/Fonts';
import {wp} from '../../../helpers/Responsiveness';
import Fonts from '../../../theme/Fonts';
import Header from '../../../components/Header';
import {connect} from 'react-redux';
import {getCategories} from '../../../redux/Business/Register/actions';

const Categories = ({navigation, reduxCategories, reduxGetCategories}) => {
  const [LocalCategories, setLocalCategories] = useState([]);

  useEffect(() => {
    setLocalCategories(reduxCategories);
  }, [reduxCategories]);

  const onSearch = (value) => {
    const filteredResult = reduxCategories.filter((cat) => {
      let postLowerCase = cat.name.toLowerCase();
      let searchTermLowerCase = value.toLowerCase();

      return postLowerCase.indexOf(searchTermLowerCase) > -1;
    });

    setLocalCategories(filteredResult);
  };

  const categories = (
    <View style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingTop: wp(5),
          
        }}
        showsVerticalScrollIndicator={false}>
        {LocalCategories.map((item, i) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('SubCategories', {category: item})
              }
              key={i}
              style={styles.categoryItem}>
              <ImageBackground
                source={{uri: item.image}}
                style={styles.imageStyle}
                imageStyle={{borderRadius: wp(5)}}></ImageBackground>
              <Text style={styles.title}>{item.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        back
        backCall={() => navigation.goBack()}
        title="Categories"
        search
        onSearch={onSearch}
      />
      {categories}
    </View>
  );
};

const mapStateToProps = ({businessRegistrationReducer}) => {
  return {
    reduxCategories: businessRegistrationReducer.categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxGetCategories: () => dispatch(getCategories()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Categories);

const styles = {
  container: {
    flex: 1,
    //alignItems: 'center',
    backgroundColor: Color.background,
  },
  heading: {
    fontSize: wp(4.2),
    fontFamily: Font.SFProText,
    fontWeight: 'bold',
    marginLeft: wp(5),
  },
  subHeading: {
    fontSize: wp(3.5),
    fontFamily: Font.SFProText,
    color: '#808080',
    marginRight: wp(5),
  },
  outlinedButton: {
    borderColor: Color.primary,
    borderWidth: wp(0.3),
    width: wp(28),
    height: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: wp(2),
    borderRadius: wp(1.5),
  },
  sliderIcon: {
    backgroundColor: '#F5F5F5',
    height: wp(25),
    width: wp(25),
    borderRadius: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: wp(4),
  },
  categoryTileActive: {
    fontSize: wp(4.2),
    fontFamily: Font.SFProText,
    fontWeight: 'bold',
    marginLeft: wp(5),
    paddingLeft: wp(2),
    borderLeftWidth: wp(0.8),
  },
  categoryTileInactive: {
    fontSize: wp(4.2),
    fontFamily: Font.SFProText,
    fontWeight: 'bold',
    marginLeft: wp(5),
    color: '#808080',
  },
  categoryItem: {
    height: wp(48),
    width: wp(41),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: wp(5),
    marginRight: wp(2.5),
    marginVertical: wp(3),
  },
  tag: {
    backgroundColor: '#EE0121',
    borderTopLeftRadius: wp(10),
    borderBottomLeftRadius: wp(10),
    position: 'absolute',
    top: wp(4.5),
    right: 0,
    paddingVertical: wp(1),
    paddingHorizontal: wp(2),
  },
  title: {
    fontSize: wp(3.5),
    fontFamily: Fonts.SFProText,
    textAlign: 'center',
  },
  imageStyle: {
    height: wp(40),
    width: wp(41),
    elevation: 5,
  },
};
