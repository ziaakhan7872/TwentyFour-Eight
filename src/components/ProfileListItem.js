import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {wp} from '../helpers/Responsiveness';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileListItem = ({
  iconGroup,
  iconName,
  title,
  onPress,
  tag,
  tagValue,
}) => {
  let Icon = Feather;
  if (iconGroup === 'SimpleLineIcons') {
    Icon = SimpleLineIcons;
  } else if (iconGroup === 'MaterialIcons') {
    Icon = MaterialIcons;
  } else if (iconGroup === 'AntDesign') {
    Icon = AntDesign;
  } else if (iconGroup === 'MaterialCommunityIcons') {
    Icon = MaterialCommunityIcons;
  }

  return (
    <View style={styles.itemRowContainer}>
      <TouchableOpacity onPress={onPress} style={styles.itemRow}>
        <View style={styles.itemLeftIcon}>
          <Icon name={iconName} size={wp(3.6)} color="black" />
        </View>
        <View style={styles.textRow}>
          <Text style={styles.itemTitle}>{title}</Text>
          {tag && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{tagValue}</Text>
            </View>
          )}
        </View>
        <Feather name="chevron-right" size={wp(6)} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileListItem;

const styles = {
  itemRowContainer: {
    borderTopWidth: wp(0.3),
    borderTopColor: '#E5E5E5',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(100),
    height: wp(17),
    paddingHorizontal: wp(10),
  },
  itemLeftIcon: {
    height: wp(7),
    width: wp(7),
    borderRadius: wp(2),
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTitle: {
    marginLeft: wp(5),
    fontSize: wp(4),
  },
  tag: {
    backgroundColor: 'red',
    marginLeft: wp(5),
    borderRadius: wp(0.8),
    height: wp(6),
    paddingHorizontal: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagText: {
    color: '#fff',
    fontSize: wp(3),
    fontWeight: '700',
  },
};
