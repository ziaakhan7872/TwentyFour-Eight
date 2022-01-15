import {combineReducers} from 'redux';

import authReducer from './User/auth/reducer';
import cartItems from './User/cart/reducer';
import searchReducer from './User/search/reducer';
import wishlistReducer from './User/wishlist/reducer';
import businessRegistrationReducer from './Business/Register/reducer';
import productReducer from './Business/Product/reducer';
import productsReducer from './User/products/reducer';
import profileReducer from './User/profile/reducer';
import cardReducer from './User/card/reducer';
import orderReducer from './User/order/reducer';
import bannerReducer from './User/banner/reducer';
import notificationReducer from './User/notifications/reducer';
import reviewReducer from './User/review/reducer';
import discountReducer from './User/discount/reducer';
import walkThroughReducer from './WalkThrough/reducer';
import splashReducer from './Splash/reducer';
const RootReducer = combineReducers({
  authReducer,
  cartItems,
  searchReducer,
  wishlistReducer,
  businessRegistrationReducer,
  productReducer,
  productsReducer,
  profileReducer,
  cardReducer,
  orderReducer,
  bannerReducer,
  notificationReducer,
  reviewReducer,
  discountReducer,
  walkThroughReducer,
  splashReducer,
});

export default RootReducer;
