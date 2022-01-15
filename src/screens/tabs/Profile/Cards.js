import React, {useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../../theme/Color';
import Fonts from '../../../theme/Fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import {wp} from '../../../helpers/Responsiveness';
import Header from '../../../components/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {myCards, deleteCard} from '../../../redux/User/card/actions';
import {connect} from 'react-redux';

const Card = ({
  navigation,
  loading,
  token,
  cards,
  reduxMyCards,
  reduxDeleteCard,
}) => {
  useEffect(() => {
    reduxMyCards(token);
  }, []);

  const onDelete = (id, name) =>
    Alert.alert('Delete Card', `Are you sure of deleting ${name}?`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => deleteCard(id)},
    ]);

  const deleteCard = (id) => {
    reduxDeleteCard(id, token);
  };
  return (
    <View style={styles.container}>
      <Header back backCall={() => navigation.goBack()} title="Cards" />

      <View style={{flex: 1, justifyContent: 'center'}}>
        {loading ? (
          <ActivityIndicator size="small" color="#000" />
        ) : cards?.length < 1 ? (
          <Text>No Card Found</Text>
        ) : (
          <ScrollView style={styles.scrollStyle}>
            {cards?.map((card, i) => {
              return (
                <TouchableOpacity key={i} style={styles.productContainer}>
                  <Image
                    source={
                      card.card_brand == 'VISA'
                        ? require('../../../assets/images/visa.png')
                        : card.card_brand == 'MASTERCARD'
                        ? require('../../../assets/images/mastercard.png')
                        : require('../../../assets/images/icon.png')
                    }
                    style={styles.productImageStyle}
                  />

                  <View style={styles.productDetailContainer}>
                    <Text style={styles.productName}>{card.name_on_card}</Text>
                    <Text style={styles.productCategory}>
                      {card.card_number}
                    </Text>
                    <Text style={styles.productPrice}>
                      {card.expiry_date.month} / {card.expiry_date.year}
                    </Text>
                  </View>

                  <View style={styles.optionButtonContainer}>
                    <TouchableOpacity
                      onPress={() => onDelete(card._id, card.card_number)}
                      style={styles.optionButton}>
                      <MaterialIcons
                        name="delete-forever"
                        size={wp(4)}
                        color="#707070"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('AddCard', {
                          card: card,
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
          onPress={() => navigation.navigate('AddCard')}
          style={{
            padding: wp(1),
          }}>
          <Entypo name="plus" size={wp(7.5)} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const mapStateToProps = ({authReducer, cardReducer}) => {
  console.log('CARD',cardReducer.cards)
  return {
    loading: cardReducer.cardLoading,
    token: authReducer.token,
    cards: cardReducer.cards,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxMyCards: (token) => dispatch(myCards(token)),
    reduxDeleteCard: (cardId, token) => dispatch(deleteCard(cardId, token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Card);

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
    resizeMode: 'contain',
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
