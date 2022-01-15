import React, {useState, useEffect} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {wp} from '../../../helpers/Responsiveness';
import Color from '../../../theme/Color';
import Fonts from '../../../theme/Fonts';
import Review from '../Home/Review';
import Header from '../../../components/Header';
import {SliderBox} from 'react-native-image-slider-box';
import {connect} from 'react-redux';
import {getReviews} from '../../../redux/User/review/actions';
import numeral from 'numeral';

const Detail = (props) => {
  const {item} = props.route.params;
  const [detail, setDetail] = useState(true);
  const [size, setSize] = useState(true);

  useEffect(() => {
    props.reduxGetReviews(item._id);
  }, []);

  const simplifyNumeric = (val) => {
    return numeral(val).format('(0.00 a)');
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
                key={index}
                style={{
                  height: wp(12),
                  width: wp(12),
                  borderRadius: wp(1),
                  marginRight: wp(4),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.regularTextStyle}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : (
        <View style={{width: wp(100), paddingHorizontal: wp(5)}}>
          <ScrollView horizontal>
            {item.colors?.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  height: wp(10),
                  width: wp(10),
                  borderRadius: wp(1),
                  marginRight: wp(4),
                  backgroundColor: '#fff',
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
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    reviews: state.reviewReducer.reviews,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxGetReviews: (productId) => dispatch(getReviews(productId)),
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
  bodyRowTwo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(5),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
