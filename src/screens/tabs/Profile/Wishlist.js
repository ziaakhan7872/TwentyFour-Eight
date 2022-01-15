import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {wp} from '../../../helpers/Responsiveness';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Color from '../../../theme/Color';
import Font from '../../../theme/Fonts';
import Header from '../../../components/Header';
import Fonts from '../../../theme/Fonts';
import {
  removeFromWishlist,
  myWishList,
} from '../../../redux/User/wishlist/actions';
const Cart = ({
  navigation,
  loading,
  wishlist,
  token,
  reduxMyWishlist,
  reduxRemoveFromWishlist,
}) => {
  const [LocalWishlist, setLocalWishlist] = useState([]);
  useEffect(() => {
    reduxMyWishlist(token);
  }, []);

  useEffect(() => {
    setLocalWishlist(wishlist);
  }, [wishlist]);

  const onRemove = (id) => {
    reduxRemoveFromWishlist(id, token);
    ToastAndroid.show('Removed from wishlist', 1500);
    setTimeout(() => {
      reduxMyWishlist(token);
    }, 1000);
  };

  const onSearch = (value) => {
    const filteredResult = wishlist.filter((wish) => {
      let postLowerCase = wish.name.toLowerCase();
      let searchTermLowerCase = value.toLowerCase();

      return postLowerCase.indexOf(searchTermLowerCase) > -1;
    });

    setLocalWishlist(filteredResult);
  };
  return (
    <View style={styles.container}>
      <Header
        back
        backCall={() => navigation.goBack()}
        title="Wishlist"
        search
        onSearch={onSearch}
      />
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator color="#000" size="small" />
        </View>
      ) : LocalWishlist?.length < 1 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>No Wishlist</Text>
        </View>
      ) : (
        <ScrollView style={{flex: 1}}>
          {LocalWishlist?.map((item, i) => {
            return (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: wp(90),
                  backgroundColor: '#fff',
                  marginTop: wp(5),
                  borderRadius: wp(2),
                  elevation: 2,
                }}>
                <Image
                  source={
                    item.images?.length !=0
                      ? {uri: item.images[0]}
                      : require('../../../assets/images/icon.png')
                  }
                  style={{height: wp(35), width: wp(30), borderRadius: wp(2)}}
                />

                <View style={{height: wp(25), width: wp(55)}}>
                  <Text
                    style={{
                      fontSize: wp(4),
                      fontFamily: Font.SFProText,
                      marginBottom: wp(2),
                    }}>
                    {item.name}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: wp(2.5),
                      width: wp(42),
                    }}>
                    {item.discount != 0 ? (
                      <>
                        <Text
                          style={{
                            fontSize: wp(3.5),
                            fontFamily: Fonts.SFProDisplayBold,
                          }}>
                          $
                          {Math.floor(
                            item.price - (item.price * item.discount) / 100,
                          )}
                        </Text>
                        <Text
                          style={{
                            fontSize: wp(3.3),
                            fontFamily: Fonts.SFProDisplay,
                            color: 'gray',
                            textDecorationLine: 'line-through',
                          }}>
                          ${item.price}
                        </Text>
                        <Text
                          style={{
                            fontSize: wp(3.3),
                            fontFamily: Font.SFProDisplay,
                            color: 'red',
                          }}>
                          {item.discount}% OFF
                        </Text>
                      </>
                    ) : (
                      <>
                        <Text
                          style={{
                            fontSize: wp(3.5),
                            fontFamily: Font.SFProDisplayBold,
                          }}>
                          ${item.price}
                        </Text>
                      </>
                    )}
                  </View>

                  <TouchableOpacity
                    onPress={() => onRemove(item._id)}
                    style={styles.favButton}>
                    {true ? (
                      <AntDesign name="heart" size={wp(4)} color="#DB1111" />
                    ) : (
                      <AntDesign name="hearto" size={wp(4)} color="#DB1111" />
                    )}
                  </TouchableOpacity>

                  <View style={styles.rating}>
                    <FontAwesome name="star" size={wp(4)} color="#FFAB24" />
                    <Text style={{marginLeft: wp(3)}}>
                      ({item.reviews.length})
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

const mapStateToProps = ({wishlistReducer, authReducer}) => {
  return {
    loading: wishlistReducer.loading,
    wishlist: wishlistReducer.wishlist,
    token: authReducer.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxMyWishlist: (token) => dispatch(myWishList(token)),
    reduxRemoveFromWishlist: (productId, token) =>
      dispatch(removeFromWishlist(productId, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary,
    width: wp(90),
    height: wp(12),
    borderRadius: wp(10),
  },
  favButton: {
    backgroundColor: '#f0f0f0',
    padding: wp(1.5),
    alignSelf: 'flex-end',
    marginRight: wp(3),
    borderRadius: wp(1.5),
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
};
