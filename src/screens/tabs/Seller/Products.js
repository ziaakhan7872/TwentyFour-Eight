import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Colors from '../../../theme/Color';
import Fonts from '../../../theme/Fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import {wp} from '../../../helpers/Responsiveness';
import Header from '../../../components/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  getProducts,
  deleteProduct,
} from '../../../redux/Business/Product/actions';
import {connect} from 'react-redux';
const Products = ({
  navigation,
  loading,
  token,
  products,
  reduxGetProducts,
  reduxDeleteProduct,
}) => {
  useEffect(() => {
    reduxGetProducts(token);
  }, [navigation]);

  const onDelete = (id, name) =>
    Alert.alert('Delete Product', `Are you sure of deleting ${name}?`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => deleteProduct(id)},
    ]);

  const deleteProduct = (id) => {
    reduxDeleteProduct(id, token);
    reduxGetProducts(token);
  };

  return (
    <View style={styles.container}>
      <Header back backCall={() => navigation.goBack()} title="My Products" />

      <View style={{flex: 1, justifyContent: 'center'}}>
        {loading ? (
          <ActivityIndicator size="small" color="#000" />
        ) : products?.length == 0 ? (
          <Text>No Products Found</Text>
        ) : (
          <ScrollView style={styles.scrollStyle}>
            {products?.map((product, i) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductDetail', {item: product})
                  }
                  key={i}
                  style={styles.productContainer}>
                  <Image
                    source={
                      product.images.length != 0
                        ? {uri: product.images[0]}
                        : require('../../../assets/images/icon.png')
                    }
                    style={styles.productImageStyle}
                  />

                  <View style={styles.productDetailContainer}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productCategory}>
                      {product.category.name}
                    </Text>
                    <Text style={styles.productPrice}>${product.price}</Text>
                  </View>

                  <View style={styles.optionButtonContainer}>
                    <TouchableOpacity
                      onPress={() => onDelete(product._id, product.name)}
                      style={styles.optionButton}>
                      <MaterialIcons
                        name="delete-forever"
                        size={wp(4)}
                        color="#707070"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('AddProduct', {
                          product: product,
                        })
                      }
                      style={styles.optionButton}>
                      <MaterialIcons name="edit" size={wp(4)} color="#707070" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: wp(5),
          right: wp(5),
          backgroundColor: Colors.primary,
          borderRadius: 100,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddProduct')}
          style={{
            padding: wp(1),
          }}>
          <Entypo name="plus" size={wp(7.5)} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = ({authReducer, productReducer}) => {
  return {
    loading: productReducer.productLoading,
    token: authReducer.token,
    products: productReducer.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxGetProducts: (token) => dispatch(getProducts(token)),
    reduxDeleteProduct: (productId, token) =>
      dispatch(deleteProduct(productId, token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Products);

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  scrollStyle: {
    width: wp(100),
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(100),
    height: wp(22),
    paddingHorizontal: wp(8),
    borderBottomWidth: wp(0.5),
    borderBottomColor: '#f0f0f0',
  },
  productImageStyle: {
    height: wp(10),
    width: wp(10),
    borderRadius: wp(10),
  },
  productDetailContainer: {
    flex: 1,
    marginHorizontal: wp(3),
    marginTop: wp(3),
  },
  productName: {
    fontSize: wp(2.9),
    fontFamily: Fonts.SFProTextSemibold,
  },
  productCategory: {
    fontSize: wp(2.5),
    fontFamily: Fonts.SFProText,
  },
  productPrice: {
    fontSize: wp(2.5),
    fontFamily: Fonts.SFProText,
    color: Colors.primary,
  },
  optionButtonContainer: {
    flexDirection: 'row',
  },
  optionButton: {
    backgroundColor: '#E5E5E5',
    height: wp(7.5),
    width: wp(7.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(1.5),
    marginLeft: wp(2),
  },
};
