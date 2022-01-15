import React, {useState, useCallback, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  ToastAndroid,
  TextInput,
} from 'react-native';
import Colors from '../../../theme/Color';
import Fonts from '../../../theme/Fonts';
import {wp} from '../../../helpers/Responsiveness';
import InputField from '../../../components/InputField';
import SolidButton from '../../../components/SolidButton';
import Header from '../../../components/Header';
import Entypo from 'react-native-vector-icons/Entypo';
import {PickImage} from '../../../helpers/Images';
import {
  addProduct,
  resetProduct,
  getProducts,
  editProduct,
} from '../../../redux/Business/Product/actions';
import {connect} from 'react-redux';
import {SlidersColorPicker} from 'react-native-color';
import tinycolor from 'tinycolor2';

const AddProduct = ({
  navigation,
  route,
  loading,
  message,
  token,
  reduxAddProduct,
  reduxResetProduct,
  reduxGetProducts,
  reduxEditProduct,
}) => {
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [promotion, setPromotion] = useState('');
  const [discount, setDiscount] = useState('');
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [showImages, setShowImages] = useState([]);
  const [ModalVisible, setModalVisible] = useState(false);
  const [Recent, setRecent] = useState([]);
  const [ProductColors, setProductColors] = useState([]);
  const [ProductSizes, setProductSizes] = useState([]);
  const [Size, setSize] = useState('');
  const [Color, setColor] = useState(tinycolor('#70c1b3').toHsl());
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [AddColor, setAddColor] = useState(false);
  const [AddSize, setAddSize] = useState(false);
  const handleImagePicker = () => {
    PickImage((img) => {
      showImages.push(img);
      newImages.push(img);
      setShowImages(showImages);
      setNewImages(newImages);
      forceUpdate();
    });
  };

  useEffect(() => {
    if (route.params?.product) {
      const {product} = route.params;
      console.log(product);
      setProductId(product._id);
      setProductName(product.name);
      setDescription(product.description);
      setQuantity(String(product.quantity).toString());
      setPrice(String(product.price).toString());
      setPromotion(product.promotion);
      setDiscount(String(product.discount).toString());
      setImages(product.images);
      setProductColors(product.colors);
      setProductSizes(product.sizes);
      if (product.colors?.length > 0) {
        setAddColor(true);
      }
      if (product.sizes?.length > 0) {
        setAddSize(true);
      }
      setShowImages(
        product.images.map((item, index) => ({
          uri: item,
        })),
      );
    }
    const unsubscribe = navigation.addListener('blur', () => {
      reduxGetProducts(token);
      reduxResetProduct();
      setShowImages([]);
    });
    return unsubscribe;
  }, [navigation]);

  const UPDATE = async () => {
    if (route.params?.product) {
      reduxEditProduct(
        newImages,
        {
          id: productId,
          name: productName,
          description: description,
          quantity: quantity,
          price: price,
          promotion: promotion,
          discount: discount == '' ? 0 : discount,
          images: images,
          sizes: ProductSizes,
          colors: ProductColors,
        },
        token,
      );
    } else {
      if (
        productName &&
        description &&
        quantity &&
        price &&
        newImages.length > 0
      ) {
        reduxAddProduct(
          {
            name: productName,
            description: description,
            quantity: quantity,
            price: price,
            promotion: promotion,
            discount: discount == '' ? 0 : discount,
            images: newImages,
            sizes: ProductSizes,
            colors: ProductColors,
          },
          token,
        );
      } else {
        ToastAndroid.show('All * fields are mandatory', 500);
      }
    }
  };

  const ImageSelectionBlock = (
    <View style={styles.imageSelectionBlock}>
      <View style={styles.topImageContainer}>
        <Image
          source={
            showImages.length
              ? {uri: showImages[showImages.length - 1].uri}
              : null
          }
          style={{height: wp(55), width: wp(55), resizeMode: 'contain'}}
        />
      </View>

      <View style={styles.imageTray}>
        <ScrollView horizontal>
          <TouchableOpacity
            onPress={handleImagePicker}
            style={styles.addButton}>
            <Entypo name="plus" size={wp(8)} color="black" />
          </TouchableOpacity>
          {showImages.map((img, i) => {
            return (
              <TouchableOpacity key={i} style={styles.imageContainer}>
                <Image
                  source={{uri: img.uri}}
                  style={{height: wp(15), width: wp(15), resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        back
        backCall={() => navigation.goBack()}
        title={route.params?.product ? 'Edit Item' : 'Add new Item'}
      />
      <ScrollView
        style={styles.scrollStyle}
        contentContainerStyle={{alignItems: 'center'}}>
        {ImageSelectionBlock}
        <Text style={styles.heading}>Please add product details here</Text>

        <InputField
          placeholder="Product name*"
          value={productName}
          onChangeText={setProductName}
        />

        <InputField
          placeholder="Description*"
          multiline
          value={description}
          onChangeText={setDescription}
          style={{marginTop: wp(2)}}
        />

        <InputField
          placeholder="Quantity*"
          value={quantity}
          onChangeText={setQuantity}
          style={{marginTop: wp(2)}}
          keyboardType="number-pad"
        />

        <InputField
          placeholder="Price*"
          value={price}
          onChangeText={setPrice}
          style={{marginTop: wp(2)}}
          keyboardType="number-pad"
        />

        <InputField
          placeholder="Promotion"
          value={promotion}
          onChangeText={setPromotion}
          style={{marginTop: wp(2)}}
        />

        <InputField
          placeholder="Discount"
          value={discount}
          onChangeText={setDiscount}
          style={{marginTop: wp(2)}}
          keyboardType="number-pad"
        />

        <View
          style={{
            marginTop: wp(5),
            width: wp(80),
            borderBottomColor: Colors.primary,
            borderBottomWidth: 1.3,
            paddingBottom: wp(1.5),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => setAddColor(!AddColor)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 10,
                width: 10,
                borderRadius: 2,
                borderWidth: 1,
                marginRight: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 5,
                  width: 5,
                  borderRadius: 2,
                  backgroundColor: AddColor ? '#000' : 'transparent',
                }}
              />
            </View>
            <Text
              style={{
                fontSize: wp(2.7),
                color: Color.secondary,
                fontFamily: Fonts.SFProDisplayMedium,
              }}>
              Color
            </Text>
          </TouchableOpacity>
          {AddColor && (
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={[styles.colorPreview, styles.box]}>
              <Text style={styles.boxIcon}>+</Text>
            </TouchableOpacity>
          )}
        </View>

        {AddColor && (
          <View
            style={{
              marginTop: wp(5),
              width: wp(80),
            }}>
            <ScrollView horizontal>
              {ProductColors?.map((item, index) => (
                <TouchableOpacity
                onPress={()=>{
                  setProductColors([
                    ...ProductColors.filter((c) => c !== item),
                  ]);
                }}
                  key={index}
                  style={[
                    styles.colorPreview,
                    {backgroundColor: ProductColors[index]},
                  ]}
                />
              ))}
            </ScrollView>
          </View>
        )}

        <View
          style={{
            marginTop: wp(5),
            width: wp(80),
            borderBottomColor: Colors.primary,
            borderBottomWidth: 1.3,
            paddingBottom: wp(1.5),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => setAddSize(!AddSize)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 10,
                width: 10,
                borderRadius: 2,
                borderWidth: 1,
                marginRight: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  height: 5,
                  width: 5,
                  borderRadius: 2,
                  backgroundColor: AddSize ? '#000' : 'transparent',
                }}
              />
            </View>
            <Text
              style={{
                fontSize: wp(2.7),
                color: Color.secondary,
                fontFamily: Fonts.SFProDisplayMedium,
              }}>
              Sizes
            </Text>
          </TouchableOpacity>

          {AddSize && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TextInput
                placeholder="Add a size variation"
                style={{
                  backgroundColor: '#f9f9f9',
                  borderRadius: 3,
                  paddingVertical: 2,
                  paddingLeft: 5,
                  marginHorizontal: 10,
                  fontSize: wp(2.7),
                  color: Color.secondary,
                  fontFamily: Fonts.SFProDisplayMedium,
                  elevation: 2,
                }}
                value={Size}
                onChangeText={setSize}
              />
              <TouchableOpacity
                onPress={() => {
                  setSize('');
                  setProductSizes([
                    Size,
                    ...ProductSizes.filter((c) => c !== Size),
                  ]);
                }}
                style={[styles.colorPreview, styles.box]}>
                <Text style={styles.boxIcon}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {AddSize && (
          <View
            style={{
              marginTop: wp(5),
              width: wp(80),
            }}>
            <ScrollView horizontal>
              {ProductSizes?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={()=>{
                    setProductSizes([
                      ...ProductSizes.filter((c) => c !== item),
                    ]);
                  }}
                  style={{
                    borderWidth: 1.3,
                    borderColor: Colors.primary,
                    borderRadius: 5,
                    paddingVertical: wp(1.8),
                    paddingHorizontal: wp(1.5),
                    marginRight: wp(1),
                  }}>
                  <Text
                    key={index}
                    style={{
                      fontSize: wp(2.7),
                      color: Color.secondary,
                      fontFamily: Fonts.SFProDisplayMedium,
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <SlidersColorPicker
          visible={ModalVisible}
          color={Color}
          returnMode={'hex'}
          onCancel={() => setModalVisible(false)}
          onOk={(colorHex) => {
            setModalVisible(false);
            setProductColors([
              colorHex,
              ...ProductColors.filter((c) => c !== colorHex),
            ]);
            setRecent([
              colorHex,
              ...Recent.filter((c) => c !== colorHex).slice(0, 4),
            ]);
          }}
          swatches={Recent}
          swatchesLabel="RECENT"
          okLabel="Done"
          cancelLabel="Cancel"
        />

        <Text style={{marginTop: wp(4)}}>{message}</Text>

        <SolidButton
          placeholder={route.params?.product ? 'Update' : 'Save'}
          style={{marginBottom: wp(7), marginTop: wp(3)}}
          onClick={UPDATE}
          bold
          loading={loading}
        />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = ({authReducer, productReducer}) => {
  return {
    loading: productReducer.productLoading,
    message: productReducer.productMessage,
    token: authReducer.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxResetProduct: () => dispatch(resetProduct()),
    reduxGetProducts: (token) => dispatch(getProducts(token)),
    reduxAddProduct: (business, token) => dispatch(addProduct(business, token)),
    reduxEditProduct: (newImages, business, token) =>
      dispatch(editProduct(newImages, business, token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  scrollStyle: {
    flex: 1,
    width: wp(100),
  },
  heading: {
    fontSize: wp(3.5),
    color: Colors.primary,
    fontFamily: Fonts.SFProDisplayBold,
    width: wp(85),
    marginBottom: wp(5),
    marginTop: wp(5),
  },
  loginButton: {
    position: 'absolute',
    top: wp(4),
    right: wp(8),
  },
  loginText: {
    fontSize: wp(3.6),
    color: Colors.primary,
    fontFamily: Fonts.SFProDisplayMedium,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(82),
  },
  imageSelectionBlock: {
    height: wp(80),
    width: wp(100),
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: wp(0.5),
  },
  imageTray: {
    height: wp(20),
  },
  addButton: {
    height: wp(17),
    width: wp(17),
    borderWidth: wp(0.2),
    borderColor: 'gray',
    borderRadius: 0.1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(6),
  },
  imageContainer: {
    height: wp(17),
    width: wp(17),
    borderWidth: wp(0.5),
    borderColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(1.5),
  },
  topImageContainer: {
    height: wp(57),
    width: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorPreview: {
    height: 30,
    width: 30,
    borderRadius: 5,
    marginRight: 10,
  },
  box: {
    borderWidth: 1.5,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxIcon: {
    fontSize: wp(7),
    color: Colors.primary,
    fontFamily: Fonts.SFProDisplay,
    marginBottom: wp(2),
  },
};
