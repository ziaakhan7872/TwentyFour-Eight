import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {wp} from '../../../helpers/Responsiveness';
import Fonts from '../../../theme/Fonts';
import Color from '../../../theme/Color';
import Entypo from 'react-native-vector-icons/Entypo';
import CheckBox from '@react-native-community/checkbox';
import SolidButton from '../../../components/SolidButton';

const Filters = (props) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const header = (
    <View style={[styles.row, styles.filterContainer]}>
      <Text style={styles.headerText}>Filter</Text>
      <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
        <Text style={styles.headerText}>Clear</Text>
      </TouchableOpacity>
    </View>
  );

  const deliveryPickup = (
    <View style={styles.filterContainer}>
      <View style={{...styles.row, marginBottom: wp(4)}}>
        <Text style={styles.filterText}>Delivery or Pickup</Text>
        <TouchableOpacity>
          <Entypo name="chevron-small-down" size={30} color={Color.primary} />
        </TouchableOpacity>
      </View>

      <View style={{...styles.row, marginBottom: wp(1)}}>
        <Text style={styles.headerText}>Deliver</Text>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(value) => setToggleCheckBox(value)}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.headerText}>Pickup</Text>
        <CheckBox
          disabled={false}
          value={true}
          onValueChange={(value) => setToggleCheckBox(value)}
        />
      </View>
    </View>
  );

  const openedStores = (
    <View style={styles.filterContainer}>
      <View style={{...styles.row, marginBottom: wp(4)}}>
        <Text style={styles.filterText}>Opened Stores</Text>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <Entypo name="chevron-small-down" size={30} color={Color.primary} />
        </TouchableOpacity>
      </View>

      <View style={{...styles.row, marginBottom: wp(1)}}>
        <Text style={styles.headerText}>Open</Text>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(value) => setToggleCheckBox(value)}
        />
      </View>
    </View>
  );

  const field = (
    <View style={styles.filterContainer}>
      <View style={{...styles.row, marginBottom: wp(4)}}>
        <Text style={styles.filterText}>Fields</Text>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <Entypo name="chevron-small-down" size={30} color={Color.primary} />
        </TouchableOpacity>
      </View>

      <View style={{...styles.row, marginBottom: wp(1)}}>
        <Text style={styles.headerText}>All</Text>
        <CheckBox
          disabled={false}
          value={false}
          onValueChange={(value) => setToggleCheckBox(value)}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.headerText}>Stores</Text>
        <CheckBox
          disabled={false}
          value={false}
          onValueChange={(value) => setToggleCheckBox(value)}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {header}
      <DrawerContentScrollView {...props}>
        {deliveryPickup}
        {openedStores}
        {field}
      </DrawerContentScrollView>

      <TouchableOpacity
        onPress={() => props.navigation.closeDrawer()}
        style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Apply Filters</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Filters;

const styles = {
  container: {
    flex: 1,
    paddingTop: wp(6),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterContainer: {
    borderBottomWidth: wp(0.7),
    paddingHorizontal: wp(5),
    paddingBottom: wp(6),
    marginTop: wp(2),
    borderBottomColor: '#f5f5f5',
  },
  headerText: {
    fontSize: wp(3.5),
    fontFamily: Fonts.SFProDisplay,
    color: '#000',
  },
  filterText: {
    fontSize: wp(3.5),
    fontWeight: '700',
    fontFamily: Fonts.SFProDisplay,
    color: Color.primary,
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.secondary,
    width: wp(35),
    height: wp(10),
    borderRadius: wp(10),
    alignSelf: 'center',
    marginBottom: wp(5),
  },
  buttonText: {
    color: Color.background,
    fontSize: wp(3.5),
    fontWeight: '700',
    fontFamily: Fonts.SFProDisplay,
  },
};
