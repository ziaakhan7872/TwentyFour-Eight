import React, {useState,useEffect} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Color from '../../../theme/Color';
import Font from '../../../theme/Fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {wp} from '../../../helpers/Responsiveness';
import Fonts from '../../../theme/Fonts';
import Header from '../../../components/Header';

const SubCategories = ({route, navigation}) => {
  const {category} = route.params;
  const [LocalSubcategories, setLocalSubcategories] = useState([]);

  useEffect(() => {
    setLocalSubcategories(category.subCategories);
  }, [category.subCategories]);

  const onSearch = (value) => {
    const filteredResult = category.subCategories.filter((cat) => {
      let postLowerCase = cat.toLowerCase();
      let searchTermLowerCase = value.toLowerCase();

      return postLowerCase.indexOf(searchTermLowerCase) > -1;
    });

    setLocalSubcategories(filteredResult);
  };

  const subCategories = (
    <View style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {LocalSubcategories.map((item, i) => {
          return (
            <TouchableOpacity 
            key={i} 
            onPress={()=>navigation.navigate('CategoryDetail',{title:item})}
            style={styles.subCategoryItem}>
              <Text style={styles.subHeading}>{item}</Text>
              <Entypo name="chevron-right" size={wp(5.8)} color="#808080" />
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
        title="Sub Categories"
        search
        onSearch={onSearch}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{category.name}</Text>
      </View>
      {subCategories}
    </View>
  );
};

export default SubCategories;

const styles = {
  container: {
    flex: 1,
    //alignItems: 'center',
    backgroundColor: Color.background,
  },
  heading: {
    fontSize: wp(4),
    fontFamily: Font.SFProText,
    fontWeight: '500',
  },
  titleContainer: {
    backgroundColor: '#f5f5f5',
    width: wp(100),
    paddingHorizontal: wp(5),
    paddingVertical: wp(3),
  },
  title: {
    fontSize: wp(3.8),
    fontFamily: Font.SFProText,
    fontWeight: '500',
  },
  subHeading: {
    fontSize: wp(3.5),
    fontFamily: Font.SFProText,
    color: '#808080',
  },
  subCategoryItem: {
    height: wp(11),
    width: wp(100),
    marginLeft: wp(6),
    paddingRight: wp(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#808080',
  },
};
