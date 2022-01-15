import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {wp} from '../../../helpers/Responsiveness';
import Font from '../../../theme/Fonts';
import Color from '../../../theme/Color';
import {connect} from 'react-redux';
import {
  addSearch,
  recentSearches,
  getSuggestions,
  getRecommended,
  clearRecent,
  deleteRecent,
} from '../../../redux/User/search/actions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Search = ({
  navigation,
  token,
  recent,
  reduxAddToRecent,
  reduxRecentSearches,
  reduxGetSuggestions,
  suggestion,
  suggestionItems,
  recommended,
  reduxGetRecommended,
  reduxClearRecent,
  loading,
  reduxDeleteRecent,
}) => {
  const [searchText, setSearchText] = useState('');
  const [OnSearch, setOnSearch] = useState(false);
  useEffect(() => {
    reduxRecentSearches(token);
    reduxGetRecommended(token);
  }, []);

  const findSuggestions = (value) => {
    setOnSearch(false);
    setSearchText(value);
    reduxGetSuggestions(token, value);
  };

  const onSearch = (searchText) => {
    setOnSearch(true);
    reduxGetSuggestions(token, searchText);
    reduxAddToRecent(searchText, token);
    reduxRecentSearches(token);
  };

  const onClear = () => {
    reduxClearRecent(token);
  };

  const deleteRecent = (title) => {
    reduxDeleteRecent(token, {title: title});
  };

  const header = (
    <View style={styles.searchStyle}>
      <AntDesign name="search1" size={wp(5.5)} color="black" />
      <TextInput
        placeholder="Search for anything"
        placeholderTextColor="#000"
        style={styles.inputStyle}
        value={searchText}
        autoFocus={true}
        onChangeText={findSuggestions}
        onSubmitEditing={onSearch}
      />
      {searchText ? (
        <TouchableOpacity onPress={() => setSearchText('')}>
          {loading ? (
            <ActivityIndicator color="#000" size="small" />
          ) : (
            <Entypo name="cross" size={wp(5.5)} color="black" />
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  );

  const suggestions = (
    <View style={styles.suggestionContainer}>
      {suggestion?.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              reduxAddToRecent(item, token);
              setSearchText(item);
              navigation.navigate('Detail', {item: suggestionItems[index]});
            }}>
            <Text style={styles.suggestionText}>{item}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const recentSearches = (
    <View style={{marginTop: wp(10)}}>
      <View style={styles.row}>
        <Text style={styles.recentLabel}>Recent Searches</Text>
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <Text style={{fontSize: wp(3.5)}}>clear</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.recentContainer}>
        {recent?.map((item, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={(item) => onSearch(item)}
              style={styles.recentItem}>
              <Text style={styles.recentText}>{item}</Text>
              <TouchableOpacity onPress={() => deleteRecent(item)}>
                <MaterialIcons
                  name="cancel"
                  size={wp(5)}
                  color={Color.secondary}
                  style={{marginLeft: wp(3)}}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  const searchResults = (
    <View style={{flex: 1, width: wp(100)}}>
      <Text style={styles.recommended}>Search Results</Text>
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginLeft: wp(1),
        }}
        showsVerticalScrollIndicator={false}>
        {suggestionItems?.map((item, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => navigation.navigate('Detail', {item: item})}
              style={styles.categoryItem}>
              <ImageBackground
                source={
                  item.images.length != 0
                    ? {uri: item.images[0]}
                    : require('../../../assets/images/icon.png')
                }
                style={{height: wp(60), width: wp(44), elevation: 5}}
                imageStyle={{borderRadius: wp(1)}}>
                {!item.discount == 0 ? null : (
                  <View style={styles.tag}>
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontFamily: Font.SFProDisplay,
                      }}>
                      {item.discount}% OFF
                    </Text>
                  </View>
                )}
              </ImageBackground>

              <Text
                numberOfLines={1}
                style={{
                  fontSize: wp(3.5),
                  fontFamily: Font.SFProText,
                  width: wp(42),
                }}>
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: wp(3.5),
                  fontFamily: Font.SFProText,
                  width: wp(42),
                  color: Color.primary,
                }}>
                ${item.price}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  const recommendedView = (
    <View style={{flex: 1, width: wp(100)}}>
      <Text style={styles.recommended}>Recommended</Text>
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginLeft: wp(1),
        }}
        showsVerticalScrollIndicator={false}>
        {recommended?.map((item, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => navigation.navigate('Detail', {item: item})}
              style={styles.categoryItem}>
              <ImageBackground
                source={
                  item.images.length != 0
                    ? {uri: item.images[0]}
                    : require('../../../assets/images/icon.png')
                }
                style={{height: wp(60), width: wp(44), elevation: 5}}
                imageStyle={{borderRadius: wp(1)}}>
                {item.discount == 0 ? null : (
                  <View style={styles.tag}>
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontFamily: Font.SFProDisplay,
                      }}>
                      {item.discount}% OFF
                    </Text>
                  </View>
                )}
              </ImageBackground>

              <Text
                numberOfLines={1}
                style={{
                  fontSize: wp(3.5),
                  fontFamily: Font.SFProText,
                  width: wp(42),
                }}>
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: wp(3.5),
                  fontFamily: Font.SFProText,
                  width: wp(42),
                  color: Color.primary,
                }}>
                ${item.price}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      {header}
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
          {searchText ? suggestions : null}
          {OnSearch && searchResults}
          {recent.length != 0 && recentSearches}
          {recommended.length != 0 && recommendedView}
        </ScrollView>
      </View>
    </View>
  );
};

const mapStateToProps = ({searchReducer, authReducer}) => {
  return {
    recent: searchReducer.recentSearches,
    recommended: searchReducer.recommended,
    suggestion: searchReducer.suggestion,
    suggestionItems: searchReducer.suggestionItems,
    token: authReducer.token,
    loading: searchReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxRecentSearches: (token) => dispatch(recentSearches(token)),
    reduxGetRecommended: (token) => dispatch(getRecommended(token)),
    reduxAddToRecent: (keyword, token) => dispatch(addSearch(keyword, token)),
    reduxGetSuggestions: (token, keyword) =>
      dispatch(getSuggestions(token, keyword)),
    reduxClearRecent: (token) => dispatch(clearRecent(token)),
    reduxDeleteRecent: (token, title) => dispatch(deleteRecent(token, title)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  searchStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    width: wp(92),
    marginTop: wp(7),
    paddingHorizontal: wp(5),
    borderRadius: wp(100),
  },
  inputStyle: {
    flex: 1,
    paddingHorizontal: wp(5),
    fontSize: wp(4.2),
    fontFamily: Font.SFProText,
    paddingVertical: wp(2.5),
  },
  suggestionContainer: {
    width: wp(90),
    marginTop: wp(5),
  },
  suggestionText: {
    fontSize: wp(4.3),
    fontFamily: Font.SFProText,
    marginTop: wp(5),
  },
  recentContainer: {
    width: wp(90),
    marginTop: wp(7),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  recentItem: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: wp(100),
    paddingVertical: wp(3.2),
    paddingHorizontal: wp(5),
    marginRight: wp(2),
    marginBottom: wp(5),
  },
  recentText: {
    fontSize: wp(3.2),
    fontFamily: Font.SFProText,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  recentLabel: {
    fontSize: wp(3.7),
    fontFamily: Font.SFProText,
  },
  categoryItem: {
    height: wp(70),
    width: wp(45),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: wp(2),
    marginRight: wp(2),
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
  recommended: {
    fontSize: wp(4.5),
    fontFamily: Font.SFProDisplayBold,
    margin: wp(5),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clearButton: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 100,
  },
};
