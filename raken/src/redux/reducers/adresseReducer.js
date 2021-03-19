import {
  ADRESSE_DELETE_REQUEST,
  ADRESSE_LIST_REQUEST,
  ADRESSE_LIST_SUCCESS,
  ADRESSE_DELETE_RESET,
  ADRESSE_DELETE_SUCCESS,
  ADRESSE_LIST_FAIL,
  ADRESSE_DELETE_FAIL,
  ADRESSE_UPDATE_REQUEST,
  ADRESSE_UPDATE_SUCCESS,
  ADRESSE_UPDATE_FAIL,
  ADRESSE_UPDATE_RESET,
  ADRESSE_GET_REQUEST,
  ADRESSE_GET_SUCCESS,
  ADRESSE_GET_FAIL,
  ADD_ADRESSE,
  GET_ADRESSE,
  REMOVE_ADRESSE
} from '../constants/adresseContants';
import { secureLocalStorage } from '../../utils/secureStorage';


export const adresseUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADRESSE_UPDATE_REQUEST:
      return { loading: true };
    case ADRESSE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case ADRESSE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ADRESSE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};


export const adresseListReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ADRESSE_LIST_REQUEST:
      return { loading: true };
    case ADRESSE_LIST_SUCCESS:
      return { loading: false, adresses: action.payload };
    case ADRESSE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const adresseReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ADRESSE:
      secureLocalStorage.setItem('addressChosen', action.payload );
      return { ...state, addressChosen: action.payload };
    case GET_ADRESSE:
      return { state };
    case REMOVE_ADRESSE:
      state = {}
      return state;
    default:
      return state;
  }
};

// export const adresseDeleteReducer = (state = {}, action) => {
//   switch (action.type) {
//     case ADRESSE_DELETE_REQUEST:
//       return { loading: true };
//     case ADRESSE_DELETE_SUCCESS:
//       return { loading: false, success: true };
//     case ADRESSE_DELETE_FAIL:
//       return { loading: false, error: action.payload };
//     case ADRESSE_DELETE_RESET:
//       return {};
//     default:
//       return state;
//   }
// };



export const getAdresseReducer = (state = {}, action) => {
  switch (action.type) {
    case ADRESSE_GET_REQUEST:
      return { loading: true };
    case ADRESSE_GET_SUCCESS:
      return { loading: false, success: true, adresse: action.payload };
    case ADRESSE_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

