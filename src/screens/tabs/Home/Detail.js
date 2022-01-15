import React, {useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {wp} from '../../../helpers/Responsiveness';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Color from '../../../theme/Color';
import Fonts from '../../../theme/Fonts';
import Review from './Review';
import SolidButton from '../../../components/SolidButton';
import OutlineButton from '../../../components/OutlineButton';
import Header from '../../../components/Header';
import {SliderBox} from 'react-native-image-slider-box';
import {connect} from 'react-redux';
import Font from '../../../theme/Fonts';
import {
  addToWishlist,
  removeFromWishlist,
  checkInWishlist,
} from '../../../redux/User/wishlist/actions';
import {addReview, getReviews} from '../../../redux/User/review/actions';
import jwt_decode from 'jwt-decode';
import numeral from 'numeral';
import Share from 'react-native-share';
const Detail = (props) => {
  const {item} = props.route.params;
  const [detail, setDetail] = useState(true);
  const [size, setSize] = useState(true);
  const [UserReview, setUserReview] = useState('');
  const [UserRating, setUserRating] = useState(1);
  const [SelectedColor, setSelectedColor] = useState('');
  const [SelectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    props.reduxCheckInWishlist(item._id, props.token);
    props.reduxGetReviews(item._id);
  }, []);
  const addFav = () => {
    props.reduxAddToWishlist(item._id, props.token);
    ToastAndroid.show('Added to wishlist!', 1500);
  };

  const removeFav = () => {
    props.reduxRemoveFromWishlist(item._id, props.token);
    ToastAndroid.show('Removed from wishlist!', 1500);
  };

  const addToCart = () => {
    props.addItemToCart({...item, SelectedColor, SelectedSize});
    ToastAndroid.show('Added to cart', 1500);
  };
  const buyNow = () => {
    props.addItemToCart({...item, SelectedColor, SelectedSize});
    props.navigation.navigate('Address');
  };

  const addReview = () => {
    props.reduxAddReview(props.token, {
      product: item._id,
      rating: UserRating,
      comment: UserReview,
    });
    setUserReview('');
    setUserRating(1);
  };

  const simplifyNumeric = (val) => {
    return numeral(val).format('(0.00 a)');
  };

  const shareProduct = () => {
    let options = {
      title: 'TwentyFour-Eight',
      message: `Buy ${
        item.name
      } now!! ${'\n'}${'\n'}https://google.com${'\n'}Tap link to open`,
    };
    Share.open(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  };

  const header = (
    <View style={styles.imageContainerStyle}>
      {item.images.length != 0 ? (
        <SliderBox
          images={item.images}
          sliderBoxHeight={wp(100)}
          parentWidth={wp(100)}
          dotColor="#000"
          inactiveDotColor="gray"
          dotStyle={{
            width: wp(1.8),
            height: wp(1.8),
            borderRadius: wp(1.8),
            marginHorizontal: -wp(1),
            marginTop: wp(2),
          }}
          paginationBoxStyle={{
            backgroundColor: 'rgba(243, 243, 243, 0.9)',
            height: wp(5),
            width: wp(14),
            borderRadius: wp(20),
            marginBottom: wp(4),
          }}
          imageLoadingColor="#f5f5f5"
        />
      ) : (
        <Image
          source={require('../../../assets/images/icon.png')}
          style={{height: wp(100), width: wp(100)}}
        />
      )}

      <View style={styles.row}>
        <TouchableOpacity onPress={shareProduct} style={styles.roundButton}>
          <Feather name="share-2" size={wp(4.5)} color="black" />
        </TouchableOpacity>

        {props.isFav ? (
          <TouchableOpacity onPress={addFav} style={styles.roundButton}>
            <AntDesign name="hearto" size={wp(4.5)} color="#000" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={removeFav} style={styles.roundButton}>
            <AntDesign name="heart" size={wp(5)} color="#000" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const body = (
    <View>
      <View style={styles.bodyRow}>
        <Text style={styles.bodyHeading}>{item.name}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${simplifyNumeric(item.price)}</Text>
          <Text style={styles.discountedPrice}>
            ${simplifyNumeric(item.price)}
          </Text>
        </View>
      </View>

      <View style={styles.bodyRowTwo}>
        <TouchableOpacity
          style={detail ? styles.bodySubheadingActive : styles.bodySubheading}
          onPress={() => setDetail(true)}>
          <Text style={styles.regularTextStyle}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={!detail ? styles.bodySubheadingActive : styles.bodySubheading}
          onPress={() => setDetail(false)}>
          <Text style={styles.regularTextStyle}>Reviews</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const reviews = (
    <View>
      {props.reviews?.map((item, i) => (
        <Review key={i} item={item} id={i + 1} total={props.reviews?.length} />
      ))}
      {props.reviews?.length < 1 && (
        <Text
          style={{
            fontSize: wp(2.8),
            fontFamily: Fonts.SFProDisplayMedium,
            color: 'gray',
            textAlign: 'center',
            marginTop: wp(10),
          }}>
          No Reviews Found
        </Text>
      )}

      {jwt_decode(props.token)._id != item.user && (
        <>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setUserRating(item)}
                style={{
                  marginRight: wp(1),
                }}>
                <AntDesign
                  name="star"
                  size={UserRating >= item ? wp(6) : wp(5)}
                  color={UserRating >= item ? '#F1BB3A' : '#CBCBCB'}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.inputStyle}>
            <TextInput
              placeholder="Add your review"
              style={{
                fontSize: wp(3.7),
                width: wp(60),
                fontFamily: Font.SFProText,
                marginLeft: wp(5),
              }}
              value={UserReview}
              onChangeText={setUserReview}
            />
            <TouchableOpacity
              onPress={addReview}
              style={{
                paddingHorizontal: wp(8),
                paddingVertical: wp(3),
                backgroundColor: '#FAFBFB',
              }}>
              {props.loading ? (
                <ActivityIndicator color="#000" size="small" />
              ) : (
                <Text
                  style={{
                    fontSize: wp(3.7),
                    fontFamily: Font.SFProText,
                    color: '#000',
                  }}>
                  SEND
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  const details = (
    <View>
      <Text style={styles.description}>{item.description}</Text>
      <View
        style={{
          ...styles.bodyRowTwo,
          marginTop: wp(5),
          borderTopWidth: 2,
          borderColor: '#f5f5f5',
          paddingVertical: wp(5),
        }}>
        {item.sizes?.length > 0 && (
          <TouchableOpacity
            style={size ? styles.bodySubheadingActive : styles.bodySubheading}
            onPress={() => setSize(true)}>
            <Text style={styles.regularTextStyle}>Size</Text>
          </TouchableOpacity>
        )}
        {item.colors?.length > 0 && (
          <TouchableOpacity
            style={!size ? styles.bodySubheadingActive : styles.bodySubheading}
            onPress={() => setSize(false)}>
            <Text style={styles.regularTextStyle}>Color</Text>
          </TouchableOpacity>
        )}
      </View>

      {size ? (
        <View style={{width: wp(100), paddingHorizontal: wp(5)}}>
          <ScrollView horizontal>
            {item.sizes?.map((item, index) => (
              <TouchableOpacity
                onPress={() => setSelectedSize(item)}
                key={index}
                style={{
                  height: wp(12),
                  width: wp(12),
                  borderRadius: wp(1),
                  marginRight: wp(4),
                  backgroundColor: item == SelectedSize ? '#000' : '#f5f5f5',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    styles.regularTextStyle,
                    {
                      color: item == SelectedSize ? '#f5f5f5' : '#000',
                    },
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : (
        <View style={{width: wp(100), paddingHorizontal: wp(5)}}>
          <ScrollView horizontal>
            {item.colors?.map((item, index) => (
              <TouchableOpacity
                onPress={() => setSelectedColor(item)}
                key={index}
                style={{
                  height: wp(10),
                  width: wp(10),
                  borderRadius: wp(1),
                  marginRight: wp(4),
                  backgroundColor: '#fff',
                  borderWidth: item == SelectedColor ? 2 : 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    height: wp(8),
                    width: wp(8),
                    borderRadius: wp(1),
                    backgroundColor: item,
                  }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
  return (
    <View style={styles.container}>
      <Header back backCall={() => props.navigation.goBack()} title="Detail" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: wp(30)}}>
        {header}
        {body}
        {detail ? details : reviews}
      </ScrollView>

      {jwt_decode(props.token)._id != item.user && (
        <View style={styles.buttonRow}>
          <OutlineButton
            onClick={addToCart}
            placeholder="Add to Cart"
            width={40}
          />
          <SolidButton onClick={buyNow} placeholder="Buy Now" width={40} />
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    reviews: state.reviewReducer.reviews,
    loading: state.reviewReducer.loading,
    isFav: state.wishlistReducer.isFav,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch({type: 'ADD_TO_CART', payload: product}),
    reduxAddToWishlist: (productId, token) =>
      dispatch(addToWishlist(productId, token)),
    reduxRemoveFromWishlist: (productId, token) =>
      dispatch(removeFromWishlist(productId, token)),
    reduxAddReview: (token, review) => dispatch(addReview(token, review)),
    reduxGetReviews: (productId) => dispatch(getReviews(productId)),
    reduxCheckInWishlist: (productId, token) =>
      dispatch(checkInWishlist(productId, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageStyle: {
    height: wp(40),
    width: wp(40),
    alignSelf: 'center',
    paddingLeft: wp(20),
  },
  imageContainerStyle: {
    height: wp(100),
    width: wp(100),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundButton: {
    height: wp(9),
    width: wp(9),
    borderRadius: wp(9) / 2,
    backgroundColor: '#ececed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  absoluteRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: wp(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(3),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(20),
    position: 'absolute',
    top: wp(5),
    right: wp(3),
  },
  tagContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: wp(2.5),
    paddingVertical: wp(1.5),
    position: 'absolute',
    right: 0,
    bottom: wp(10),
    borderTopLeftRadius: wp(10),
    borderBottomLeftRadius: wp(10),
  },
  tagText: {
    fontSize: wp(4),
    fontFamily: Fonts.SFProText,
    color: '#fff',
  },
  backButton: {
    height: wp(10),
    width: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    paddingTop: wp(5),
    paddingBottom: wp(8),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyRowTwo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(5),
  },
  bodyHeading: {
    fontSize: wp(4.5),
    fontFamily: Fonts.SFProDisplayBold,
    width: wp(48),
  },
  price: {
    fontSize: wp(3.5),
    fontFamily: Fonts.SFProDisplay,
    color: 'gray',
    textDecorationLine: 'line-through',
    textDecorationColor: 'gray',
    marginTop: wp(1),
  },
  discountedPrice: {
    fontSize: wp(5),
    fontFamily: Fonts.SFProDisplayBold,
    color: Color.primary,
    marginLeft: wp(2),
  },
  bodySubheading: {
    fontSize: wp(4),
    fontFamily: Fonts.SFProText,
    marginRight: wp(8),
    backgroundColor: '#fff',
    height: wp(10),
    width: wp(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(20),
  },
  bodySubheadingActive: {
    fontSize: wp(4),
    fontFamily: Fonts.SFProText,
    marginRight: wp(8),
    backgroundColor: '#f5f5f5',
    height: wp(10),
    width: wp(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(20),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: wp(3),
  },
  description: {
    color: '#000',
    fontSize: wp(3.5),
    fontFamily: Fonts.SFProText,
    marginTop: wp(4),
    paddingHorizontal: wp(5),
  },
  regularTextStyle: {
    color: '#000',
    fontSize: wp(3.5),
    fontFamily: Fonts.SFProText,
  },
  inputStyle: {
    flexDirection: 'row',
    borderWidth: wp(0.3),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
    borderColor: '#f0f0f0',
    borderRadius: wp(1.2),
  },
  ratingContainer: {
    flexDirection: 'row',
    borderWidth: wp(0.3),
    alignItems: 'center',
    marginHorizontal: wp(4),
    borderColor: '#f0f0f0',
    borderTopLeftRadius: wp(1.2),
    borderTopRightRadius: wp(1.2),
    marginTop: wp(7),
    paddingVertical: wp(3),
    paddingHorizontal: wp(5),
    marginBottom: -wp(0.5),
  },
};
