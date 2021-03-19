import {
  CART_ADD_ITEM,
  CART_ADD_ITEM_FAIL,
  CART_EMPTY,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_ADD_QUANTITY,
  CART_REMOVE_QUANTITY
} from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {

  switch (action.type) {

    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        // delete item.qty
        var itemWithQty = { ...item, qty: existItem.qty + item.qty }
        return {
          ...state,
          error: '',
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? itemWithQty : x
          ),
        };
      } else {
        return { ...state, error: '', cartItems: [...state.cartItems, item] };
      }


    case CART_REMOVE_ITEM:

      return {
        ...state,
        error: '',
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };


    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };

    case CART_ADD_QUANTITY:
      const existItem2 = state.cartItems.find((x) => x.product === action.payload);

      if (existItem2) {
        var itemWithQty = { ...existItem2, qty: existItem2.qty < 3 && existItem2.qty < existItem2.countInStock ? existItem2.qty + 1: existItem2.qty }
        return {
          ...state,
          error: '',
          cartItems: state.cartItems.map((x) =>
            x.product === existItem2.product ? itemWithQty : x
          ),
        };
      } else {
        return { ...state, error: '', cartItems: [...state.cartItems, existItem2] };
      }

    case CART_REMOVE_QUANTITY:
      const existItem3 = state.cartItems.find((x) => x.product === action.payload);
      if (existItem3) {
        var itemWithQty = { ...existItem3, qty: existItem3.qty > 1 ? existItem3.qty - 1 : 1}
        return {
          ...state,
          error: '',
          cartItems: state.cartItems.map((x) =>
            x.product === existItem3.product ? itemWithQty : x
          ),
        };
      } else {
        return { ...state, error: '', cartItems: [...state.cartItems, existItem3] };
      }


    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };


    case CART_ADD_ITEM_FAIL:
      return { ...state, error: action.payload };


    case CART_EMPTY:
      return { ...state, error: '', cartItems: [] };


    default:
      return state;
  }
};
