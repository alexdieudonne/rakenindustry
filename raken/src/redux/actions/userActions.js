import Axios from 'axios';
import { RAKEN_URL } from '../../utils/Functions';
import { secureLocalStorage, secureStorage, encrypt, decrypt } from '../../utils/secureStorage';
import { stringToDate } from '../../utils/Functions';
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from '../constants/userConstants';


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const checkout = urlParams.get('checkout')


export const register = (user) => async (dispatch) => {

  var { gender,
    firstname,
    lastname,
    email,
    password,
    birthday,
    newsletter } = user;

  String.prototype.toDate = function (format) {
    format = format || "dmy";
    var separator = this.match(/[^0-9]/)[0];
    var components = this.split(separator);
    var day, month, year;
    for (var key in format) {
      var fmt_value = format[key];
      var value = components[key];
      switch (fmt_value) {
        case "d":
          day = parseInt(value);
          break;
        case "m":
          month = parseInt(value) - 1;
          break;
        case "y":
          year = parseInt(value);
      }
    }
    return new Date(year, month, day);
  };

  var a = "3/2/2017";
  if (birthday)
    birthday = birthday.toDate("dmy")
  console.log(birthday)
  //birthday = stringToDate(birthday, "dd/MM/yyyy", "/")

  dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post(`${RAKEN_URL}/api/users/register`, user);

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    // dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    //secureLocalStorage.setItem('userInfo', JSON.stringify(data));
     document.location.href = checkout ? `/connexion?${encrypt('success')}` : `/connexion?${encrypt('success')}&checkout=true`;
   //  document.location.href = checkout ? `/connexion?${encrypt('success')}` : `/connexion?${encrypt('success')}`;

    //document.location.href = checkout ? `/checkout` : `/account`;
  } catch (error) {
    //console.log(error.response.data)
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error?.response && error.response?.data
          ? error.response?.data
          : error.message,
    });
  }
};

export const signin = (user) => async (dispatch) => {
  const { email, password } = user;

  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post(`${RAKEN_URL}/api/users/signin`, { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    secureLocalStorage.setItem('userInfo', data);
    document.location.href = checkout ? `/checkout` : `/account`;
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    });
  }
};

export const signout = () => (dispatch) => {
  secureLocalStorage.removeItem('userInfo');
  secureStorage.clear()
  secureLocalStorage.removeItem('cartItems');
  secureLocalStorage.removeItem('shippingAddress');
  dispatch({ type: USER_SIGNOUT });
  document.location.href = '/connexion';
};


export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`${RAKEN_URL}/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo?.token}`, },

    });
    console.log(data)

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: USER_SIGNOUT });
    secureLocalStorage.removeItem('userInfo');

    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};


export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`${RAKEN_URL}/api/users/profile`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    secureLocalStorage.setItem('userInfo', JSON.stringify(data));

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
  }
};


export const updateUser = (user) => async (dispatch, getState) => {

  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`${RAKEN_URL}/api/users/profile`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    secureLocalStorage.setItem('userInfo', data);
    document.location.href = `/account`;
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: USER_UPDATE_FAIL, payload: message });
  }
};


// export const listUsers = () => async (dispatch, getState) => {
//   dispatch({ type: USER_LIST_REQUEST });
//   try {
//     const {
//       userSignin: { userInfo },
//     } = getState();
//     const { data } = await Axios.get(`${RAKEN_URL}/api/users`, {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     });
//     dispatch({ type: USER_LIST_SUCCESS, payload: data });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch({ type: USER_LIST_FAIL, payload: message });
//   }
// };

// export const deleteUser = (userId) => async (dispatch, getState) => {
//   dispatch({ type: USER_DELETE_REQUEST, payload: userId });
//   const {
//     userSignin: { userInfo },
//   } = getState();
//   try {
//     const { data } = await Axios.delete(`${RAKEN_URL}/api/users/${userId}`, {
//       headers: { Authorization: `Bearer ${userInfo.token}` },
//     });
//     dispatch({ type: USER_DELETE_SUCCESS, payload: data });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch({ type: USER_DELETE_FAIL, payload: message });
//   }
// };

