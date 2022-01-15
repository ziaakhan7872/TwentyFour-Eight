import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../../theme/Color';
import Font from '../../../theme/Fonts';
import SortIcon from '../../../assets/images/sort.svg';
import Feather from 'react-native-vector-icons/Feather';
import {wp} from '../../../helpers/Responsiveness';
import Fonts from '../../../theme/Fonts';
import Header from '../../../components/Header';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Filters from './Filters';
import {connect} from 'react-redux';
import {getAllProductsOfSubcategory} from '../../../redux/User/products/actions';
const Drawer = createDrawerNavigator();

const CategoryDetail = ({
  route,
  navigation,
  props,
  loading,
  categoryProducts,
  reduxGetAllProductsOfSubcategory,
}) => {
  const [LocalProducts, setLocalProducts] = useState([]);

  useEffect(() => {
    setLocalProducts(categoryProducts.products);
  }, [categoryProducts.products]);

  const onSearch = (value) => {
    const filteredResult = categoryProducts.products.filter((product) => {
      let postLowerCase = product.name.toLowerCase();
      let searchTermLowerCase = value.toLowerCase();

      return postLowerCase.indexOf(searchTermLowerCase) > -1;
    });

    setLocalProducts(filteredResult);
  };

  useEffect(() => {
    reduxGetAllProductsOfSubcategory(route.params.title);
  }, []);
  const categories = (
    <View style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingVertical: wp(5),
        }}
        showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator color="#000" size="small" />
        ) : LocalProducts?.length == 0 ? (
          <View style={{width: wp(100), marginTop: wp(30)}}>
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
          LocalProducts?.map((item, i) => {
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
  );

  return (
    <View style={styles.container}>
      <Header
        back
        backCall={() => navigation.goBack()}
        title={route.params.title}
        search
        onSearch={onSearch}
      />
      <View style={{...styles.row, width: wp(90), marginTop: wp(5)}}>
        <TouchableOpacity style={styles.row}>
          <SortIcon height={wp(6)} width={wp(6)} />
          <Text>Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
          <Feather name="filter" size={wp(5)} color="black" />
        </TouchableOpacity>
      </View>
      {categories}
    </View>
  );
};

function CategoryDetailScreen({
  route,
  navigation,
  loading,
  categoryProducts,
  reduxGetAllProductsOfSubcategory,
}) {
  return (
    <Drawer.Navigator drawerContent={(props) => <Filters {...props} />}>
      <Drawer.Screen
        name="CategoryDetail"
        children={(props) => (
          <CategoryDetail
            route={route}
            navigation={navigation}
            props={props}
            loading={loading}
            categoryProducts={categoryProducts}
            reduxGetAllProductsOfSubcategory={reduxGetAllProductsOfSubcategory}
          />
        )}
      />
    </Drawer.Navigator>
  );
}
const mapStateToProps = ({productsReducer}) => {
  return {
    categoryProducts: productsReducer.category,
    loading: productsReducer.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxGetAllProductsOfSubcategory: (category) =>
      dispatch(getAllProductsOfSubcategory(category)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryDetailScreen);
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
    elevation: 8,
    marginBottom: wp(1),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};
