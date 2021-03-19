import Axios from 'axios';
import { RAKEN_URL } from '../../utils/Functions';
import { secureLocalStorage } from '../../utils/secureStorage';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_ADD_ITEM_FAIL,
  CART_REMOVE_QUANTITY, 
  CART_ADD_QUANTITY
} from '../constants/cartConstants';

export const addToCart = (productId, qty, activeSize, color) => async (dispatch, getState) => {
  const { data } = await Axios.get(`${RAKEN_URL}/api/products/${productId}`);

  const {
    cart: { cartItems },
  } = getState();
   console.log(color)
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        _id:data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        color,
        size:activeSize,
        product: data._id,
        qty,
      },
    });
    secureLocalStorage.setItem('cartItems', getState().cart.cartItems);

};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  secureLocalStorage.setItem('cartItems', getState().cart.cartItems);
};

export const handleQuantity = (productId, type) => (dispatch, getState) => {
  if(type == 'moins'){
    dispatch({ type: CART_REMOVE_QUANTITY, payload: productId });
    secureLocalStorage.setItem('cartItems', getState().cart.cartItems);
  }else {
    dispatch({ type: CART_ADD_QUANTITY, payload: productId });
    secureLocalStorage.setItem('cartItems', getState().cart.cartItems);
  }
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};
