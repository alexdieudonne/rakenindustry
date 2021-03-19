import Axios from 'axios';
import { RAKEN_URL } from '../../utils/Functions';
import {
    REQUEST_ADD_RETURN,
    SUCCESS_ADD_RETURN,
    FAIL_ADD_RETURN,
    REQUEST_GET_RETURN,
    SUCCESS_GET_RETURN,
    FAIL_GET_RETURN,
    REQUEST_REMOVE_RETURN,
    SUCCESS_REMOVE_RETURN,
    FAIL_REMOVE_RETURN
} from '../constants/returnContants';



export const getReturns = () => async (dispatch, getState) => {
    dispatch({ type: REQUEST_GET_RETURN });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.get(`${RAKEN_URL}/api/returns`, {
            headers: { Authorization: `Bearer ${userInfo?.token}`, },
        });

        dispatch({ type: SUCCESS_GET_RETURN, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: FAIL_GET_RETURN, payload: message });
    }
};


export const removeReturn = (adresse, adresseId, site) => async (dispatch, getState) => {
    dispatch({ type: REQUEST_REMOVE_RETURN, payload: adresse });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.put(`${RAKEN_URL}/api/returns/${adresseId}`, adresse, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: SUCCESS_REMOVE_RETURN, payload: data });
        document.location.href = site ? site : `/account/address-book/`;
        // dispatch({ type: ADRESSE_LIST_SUCCESS, payload: data });
    } catch (error) {

        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        dispatch({ type: FAIL_REMOVE_RETURN, payload: message });
    }
};

export const addReturn = (return_) => async (dispatch, getState) => {
  //  dispatch({ type: REQUEST_ADD_RETURN });
    const {
        userSignin: { userInfo },
    } = getState();
    try {
        const { data } = await Axios.post(`${RAKEN_URL}/api/returns`, return_, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
       dispatch({ type: SUCCESS_ADD_RETURN, payload: data });
        // document.location.href = path ? path:  `/account/address-book/` ;
        // dispatch({ type: ADRESSE_LIST_SUCCESS , payload: data });
    } catch (error) {
        console.log(error.response)
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: FAIL_ADD_RETURN, payload: message });
    }
};

