import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../../theme/Color';
import Font from '../../../theme/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {wp} from '../../../helpers/Responsiveness';
import {connect} from 'react-redux';
import {
  allProducts,
  popularProducts,
  discountedProducts,
  exclusiveProducts,
} from '../../../redux/User/products/actions';
import {getCategories} from '../../../redux/Business/Register/actions';
import {getBanners} from '../../../redux/User/banner/actions';

const Home = ({
  navigation,
  token,
  all,
  popular,
  discounted,
  exclusive,
  reduxAllProducts,
  reduxPopularProducts,
  reduxDiscountedProducts,
  reduxExclusiveProducts,
  reduxCategories,
  reduxGetCategories,
  reduxGetBanners,
  banner,
  categoryLoading,
  productLoading,
}) => {
  const [data, setData] = useState(popular);
  const [activeCat, setActiveCat] = useState('All');

  useEffect(() => {
    reduxGetBanners();
    reduxGetCategories();
    reduxAllProducts();
  }, []);

  useEffect(() => {
    if (activeCat == 'All') {
      setData(all);
    } else if (activeCat == 'Popular') {
      setData(popular);
    } else if (activeCat == 'Discount') {
      setData(discounted);
    } else {
      setData(exclusive);
    }
  }, [activeCat, all, popular, discounted, exclusive]);

  const searchBar = (
    <TouchableOpacity
      onPress={() => navigation.navigate('Search')}
      style={{
        backgroundColor: '#fff',
        width: wp(100),
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: wp(10),
        paddingBottom: wp(7),
        elevation: 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#F5F5F5',
          borderWidth: 1,
          borderColor: 'silver',
          width: wp(85),
          paddingHorizontal: wp(3),
        }}>
        <Ionicons name="ios-search" size={wp(4)} color="#8A8A8F" />
        <TextInput
          placeholder="Search for anything"
          style={{fontSize: wp(2.9), fontFamily: Font.SFProDisplay}}
          editable={false}
        />
      </View>
    </TouchableOpacity>
  );

  const auth = (
    <View style={{paddingHorizontal: wp(13)}}>
      <Text
        style={{
          ...styles.subHeading,
          textAlign: 'center',
          fontSize: wp(3.3),
          marginRight: 0,
        }}>
        Hi, Kindly login to continue shopping
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: wp(8),
          paddingHorizontal: wp(6),
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={styles.outlinedButton}>
          <Text
            style={{
              fontSize: wp(3.2),
              color: Color.primary,
              fontWeight: 'bold',
            }}>
            Register
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.outlinedButton}>
          <Text
            style={{
              fontSize: wp(3.2),
              color: Color.primary,
              fontWeight: 'bold',
            }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const adBody = (
    <View style={{backgroundColor: '#f5f5f5', paddingTop: wp(5)}}>
      {token == '' && auth}

      <Image
        source={
          banner?.media?.type == 'image'
            ? {uri: banner.media.url}
            : require('../../../assets/images/explore.png')
        }
        style={{height: wp(30), width: wp(100)}}
      />
    </View>
  );

  const exploreCategories = (
    <View
      style={{
        height: wp(45),
        borderBottomColor: '#f5f5f5',
        borderBottomWidth: 1,
        paddingTop: wp(5),
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={styles.heading}>Explore Popular Categories</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
          <Text style={styles.subHeading}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categoryLoading ? (
          <View style={styles.categoryLoadingContainer}>
            <ActivityIndicator color="#000" size="small" />
          </View>
        ) : reduxCategories.length == 0 ? (
          <View style={{width: wp(100), marginTop: wp(10)}}>
            <Text
              style={{
                fontSize: 12,
                fontFamily: Font.SFProDisplay,
                textAlign: 'center',
              }}>
              No Categories Available
            </Text>
          </View>
        ) : (
          reduxCategories?.map((item, i) => {
            return (
              <View
                key={i}
                style={
                  i
                    ? {
                        ...styles.sliderIcon,
                        marginRight: wp(5),
                      }
                    : {...styles.sliderIcon, marginHorizontal: wp(5)}
                }>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('SubCategories', {category: item})
                  }
                  style={styles.sliderIconInnerContainer}>
                  <Image
                    source={{uri: item.image}}
                    style={{
                      height: wp(15),
                      width: wp(15),
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );

  const categories = (
    <View style={{paddingTop: wp(5)}}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            // reduxGetCategories();
            reduxAllProducts();
            setActiveCat('All');
          }}>
          <Text
            style={
              activeCat === 'All'
                ? styles.categoryTileActive
                : styles.categoryTileInactive
            }>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // reduxGetCategories();
            reduxPopularProducts();
            setActiveCat('Popular');
          }}>
          <Text
            style={
              activeCat === 'Popular'
                ? styles.categoryTileActive
                : styles.categoryTileInactive
            }>
            Popular
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // reduxGetCategories();
            reduxDiscountedProducts();
            setActiveCat('Discount');
          }}>
          <Text
            style={
              activeCat === 'Discount'
                ? styles.categoryTileActive
                : styles.categoryTileInactive
            }>
            Discount
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // reduxGetCategories();
            reduxExclusiveProducts();
            setActiveCat('Exclusive');
          }}>
          <Text
            style={
              activeCat === 'Exclusive'
                ? styles.categoryTileActive
                : styles.categoryTileInactive
            }>
            Exclusive
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <ScrollView
          contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}
          showsVerticalScrollIndicator={false}>
          {productLoading ? (
            <View style={styles.categoryLoadingContainer}>
              <ActivityIndicator
                color="#000"
                size="small"
                style={{marginTop: 50}}
              />
            </View>
          ) : data?.length == 0 ? (
            <View style={{width: wp(100), marginTop: wp(10)}}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: Font.SFProDisplay,
                  textAlign: 'center',
                }}>
                No Products Available
              </Text>
            </View>
          ) : (
            data?.map((item, i) => {
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
                    style={{height: wp(40), width: wp(41), elevation: 5}}
                    imageStyle={{borderRadius: wp(5)}}>
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
                  <Text style={{fontSize: wp(3.5), fontFamily: Font.SFProText}}>
                    Rs. {item.price}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{fontSize: wp(3.5), fontFamily: Font.SFProText}}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        {searchBar}
        {adBody}
        {exploreCategories}
        {categories}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = ({
  authReducer,
  productsReducer,
  businessRegistrationReducer,
  bannerReducer,
}) => {
  return {
    token: authReducer.token,
    productLoading: productsReducer.loading,
    all: productsReducer.all,
    popular: productsReducer.popular,
    discounted: productsReducer.discounted,
    exclusive: productsReducer.exclusive,
    reduxCategories: businessRegistrationReducer.categories,
    banner: bannerReducer.banner,
    categoryLoading: businessRegistrationReducer.businessLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxGetBanners: () => dispatch(getBanners()),
    reduxGetCategories: () => dispatch(getCategories()),
    reduxAllProducts: () => dispatch(allProducts()),
    reduxPopularProducts: () => dispatch(popularProducts()),
    reduxDiscountedProducts: () => dispatch(discountedProducts()),
    reduxExclusiveProducts: () => dispatch(exclusiveProducts()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
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
    overflow: 'hidden',
  },
  sliderIconInnerContainer: {
    height: wp(25),
    width: wp(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTileActive: {
    fontSize: wp(4.2),
    fontFamily: Font.SFProText,
    fontWeight: 'bold',
    marginLeft: wp(5),
    paddingLeft: wp(2),
    borderLeftWidth: wp(0.8),
    color: '#000',
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
  categoryLoadingContainer: {
    width: wp(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
};
