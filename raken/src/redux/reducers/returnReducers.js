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

export const addReturnReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_ADD_RETURN:
      return { loading: true };
    case SUCCESS_ADD_RETURN:
      return { loading: false, return: action.payload };
    case FAIL_ADD_RETURN:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const removeReturnReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_REMOVE_RETURN:
      return { loading: true };
    case SUCCESS_REMOVE_RETURN:
      return { loading: false, returns: action.payload };
    case FAIL_REMOVE_RETURN:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const getReturnReducer = (state = { loading: true, returns:[] }, action) => {
  switch (action.type) {
    case REQUEST_GET_RETURN:
      return { loading: true };
    case SUCCESS_GET_RETURN:
      return { loading: false, returns: action.payload };
    case FAIL_GET_RETURN:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
