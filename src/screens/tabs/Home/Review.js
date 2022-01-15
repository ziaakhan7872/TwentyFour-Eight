import React from 'react';
import {Text, View, Image} from 'react-native';
import {wp} from '../../../helpers/Responsiveness';
import Fonts from '../../../theme/Fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
const Review = ({item, id, total}) => {
  const renderStars = (rating) => {
    const views = [];
    for (let index = 0; index < 5; index++) {
      views.push(
        <AntDesign
          key={index}
          name="star"
          size={wp(4)}
          color={index < rating ? '#F1BB3A' : '#CBCBCB'}
        />,
      );
    }
    return views;
  };
  return (
    <View
      style={{
        width: wp(90),
        alignSelf: 'center',
        marginTop: wp(5),
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: wp(90),
          alignSelf: 'center',
        }}>
        <Image
          source={{uri: item.user.profile_image}}
          style={{height: wp(15), width: wp(15), borderRadius: wp(8)}}
        />

        <View>
          <View style={styles.row}>
            <Text style={styles.heading}>{item.user.name}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {renderStars(item.rating)}
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.subheading}>
              {moment(item.createdAt).fromNow()}
            </Text>
            <Text style={{...styles.subheading, marginRight: wp(10)}}>
              {id} of {total}
            </Text>
          </View>
        </View>
      </View>
      <Text style={styles.description}>{item.comment}</Text>
    </View>
  );
};

export default Review;

const styles = {
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(75),
    paddingHorizontal: wp(3),
  },
  description: {
    color: 'gray',
    fontSize: wp(3.5),
    fontFamily: Fonts.SFProText,
    marginTop: wp(4),
    paddingLeft: wp(1),
  },
  heading: {
    fontSize: wp(4),
    fontWeight: '700',
    fontFamily: Fonts.SFProText,
  },
  subheading: {
    color: 'gray',
    fontSize: wp(3.5),
    fontFamily: Fonts.SFProText,
  },
};
