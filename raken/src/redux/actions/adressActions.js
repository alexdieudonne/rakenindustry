import Axios from 'axios';
import { RAKEN_URL } from '../../utils/Functions';
import {
    ADRESSE_DELETE_FAIL,
    ADRESSE_DELETE_SUCCESS,
    ADRESSE_LIST_FAIL,
    ADRESSE_LIST_REQUEST,
    ADRESSE_LIST_SUCCESS,
    ADRESSE_UPDATE_FAIL,
    ADRESSE_UPDATE_REQUEST,
    ADRESSE_UPDATE_SUCCESS,
    ADRESSE_GET_REQUEST,
    ADRESSE_GET_SUCCESS,
    ADRESSE_GET_FAIL,
    ADD_ADRESSE,
    GET_ADRESSE,
    REMOVE_ADRESSE
} from '../constants/adresseContants';
import {
    USER_UPDATE_PROFILE_FAIL,
    USER_DELETE_REQUEST,
} from '../constants/userConstants';
;


export const listAdresses = () => async (dispatch, getState) => {
    dispatch({ type: ADRESSE_LIST_REQUEST, payload: 'adresse' });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(`${RAKEN_URL}/api/adresse/`, {
            headers: { Authorization: `Bearer ${userInfo?.token}`, },
        });

        dispatch({ type: ADRESSE_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: ADRESSE_LIST_FAIL, payload: message });
    }
};


export const updateListAdresses = (adresse, adresseId, site) => async (dispatch, getState) => {
    dispatch({ type: ADRESSE_UPDATE_REQUEST, payload: adresse });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.put(`${RAKEN_URL}/api/adresse/${adresseId}`, adresse, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: ADRESSE_UPDATE_SUCCESS, payload: data });
        document.location.href = site? site: `/account/address-book/`;
        // dispatch({ type: ADRESSE_LIST_SUCCESS, payload: data });
    } catch (error) {

        const message =
        error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
    }
};

export const addAdress = (adresse, path) => async (dispatch, getState) => {
    //  console.log(adresse)
    dispatch({ type: ADRESSE_UPDATE_REQUEST, payload: adresse });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.post(`${RAKEN_URL}/api/adresse`, adresse, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: ADRESSE_UPDATE_SUCCESS, payload: data });
        document.location.href = path ? path:  `/account/address-book/` ;
        // dispatch({ type: ADRESSE_LIST_SUCCESS , payload: data });
    } catch (error) {
        console.log(error.response)
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: ADRESSE_UPDATE_FAIL, payload: message });
    }
};


export const deleteListAdresses = (adresseId) => async (dispatch, getState) => {

    dispatch({ type: USER_DELETE_REQUEST, payload: adresseId });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.delete(`${RAKEN_URL}/api/adresse/${adresseId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        console.log(data)
        dispatch({ type: ADRESSE_LIST_SUCCESS, payload: data.adress });
    } catch (error) {

        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: ADRESSE_DELETE_FAIL, payload: message });
    }
};


export const getAdresse = (adresseId) => async (dispatch, getState) => {
    console.log(adresseId)
    dispatch({ type: ADRESSE_GET_REQUEST, payload: adresseId });

    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(`${RAKEN_URL}/api/adresse/${adresseId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({ type: ADRESSE_GET_SUCCESS, payload: data });
    } catch (error) {

        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: ADRESSE_GET_FAIL, payload: message });
    }
}

export const chooseAdresse = (adresseId) => async (dispatch, getState) => {
    dispatch({ type: ADD_ADRESSE, payload: adresseId });
}

export const displayAdresse = () => async (dispatch, getState) => {
    dispatch({ type: GET_ADRESSE});
}

export const removeAdresse = () => async (dispatch, getState) => {
    dispatch({ type: REMOVE_ADRESSE });
}



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

