import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { secureLocalStorage } from '../utils/secureStorage';
import { cartReducer } from './reducers/cartReducers';
import {
  orderCreateReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListReducer,
  orderMineListReducer,
  orderPayReducer,
} from './reducers/orderReducers';
import {
  productCategoryListReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productSuggestionReducer,
  productListReducer,
  productReviewCreateReducer,
  productUpdateReducer,
} from './reducers/productReducers';
import {
  userAddressMapReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducer,
  userSigninReducer,
  userTopSellerListReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from './reducers/userReducers';

import {
  adresseListReducer,
  adresseUpdateReducer,
  getAdresseReducer,
  adresseReducer
} from './reducers/adresseReducer';
import { addReturnReducer, getReturnReducer, removeReturnReducer } from './reducers/returnReducers';


var cartItems = [];
var shippingAddress;
var userInfo;
var addressChosen;
try {
  cartItems = secureLocalStorage.getItem('cartItems');
  shippingAddress = secureLocalStorage.getItem('shippingAddress');
  userInfo = secureLocalStorage.getItem('userInfo');
  addressChosen = secureLocalStorage.getItem('addressChosen');
} catch (e) {
  // console.log(e)
  cartItems = []
  secureLocalStorage.clear()
}

const initialState = {
  userSignin: {
    userInfo: userInfo
      ? userInfo
      : null,
  },
  cart: {
    cartItems: cartItems
      ? cartItems
      : [],
    shippingAddress: shippingAddress
      ? shippingAddress
      : {},
    paymentMethod: 'PayPal',
  },
  adresse: {
    addressChosen:addressChosen?addressChosen:""
  },
};

const reducer = combineReducers({
  adresse: adresseReducer,
  adresseList: adresseListReducer,
  adresseUpdate: adresseUpdateReducer,
  adresseGet: getAdresseReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productSuggestion: productSuggestionReducer,
  returnAdd:addReturnReducer,
  returnGet:getReturnReducer,
  returnRemove:removeReturnReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userTopSellersList: userTopSellerListReducer,
  productCategoryList: productCategoryListReducer,
  productReviewCreate: productReviewCreateReducer,
  userAddressMap: userAddressMapReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
