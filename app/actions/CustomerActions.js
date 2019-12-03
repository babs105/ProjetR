import * as types from './actionConstants';
import { customerService } from '../service/customerService';

export const customerActions = {
  createCustomer,
  getAllCustomer,
  deleteCustomer,
  getCustomer
};

function createCustomer(data, avatar) {
  const dataArray = data.toJS();
  return dispatch => {
    customerService.createCustomer(dataArray)
      .then(
        data => {
          dispatch(createSuccess(data, avatar));
        },
        error => {
          dispatch(createFailure('FAILURE CREATE CUSTOMER'));
        }
      );
  };
}

function getAllCustomer() {
  return dispatch => {
    customerService.getAllCustomer()
      .then(
        data => {
          dispatch(success(data));
        },
        error => {
          dispatch(failure('FAILURE GET ALL CUSTOMER'));
        }
      );
  };
}

function getCustomer(data) {
  const customerNumber = data.get('customerNumber');
  const data2 = data;
  return dispatch => {
    customerService.getCustomer(customerNumber)
      .then(
        data => {
          dispatch(getSuccess(data2));
        },
        error => {
          dispatch(getFailure('FAILURE GET CUSTOMER '));
        }
      );
  };
}

function deleteCustomer(data) {
  const customerNumber = data.get('customerNumber');
  const data2 = data;
  return dispatch => {
    customerService.deleteCustomer(customerNumber)
      .then(
        data => {
          dispatch(deleteSuccess(data2));
        },
        error => {
          dispatch(deleteFailure('FAILURE DELETE CUSTOMER'));
        }
      );
  };
}

function success(items) {
  return {
    type: types.CUSTOMER_ALL_SUCCESS,
    items
  };
}

function createSuccess(items, avatar) {
  return {
    type: types.CREATE_CUSTOMER_SUCCESS,
    items,
    avatar
  };
}

function deleteSuccess(item) {
  return {
    type: types.DELETE_CUSTOMER_SUCCESS,
    item
  };
}

function deleteFailure(error) {
  return {
    type: types.DELETE_CUSTOMER_ERROR,
    error
  };
}

function failure(error) {
  return {
    type: types.CUSTOMER_ALL_ERROR,
    error
  };
}

function getFailure(error) {
  return {
    type: types.GET_CUSTOMER_ERROR,
    error
  };
}

function getSuccess(items) {
  return {
    type: types.GET_CUSTOMER_SUCCESS,
    items
  };
}

function createFailure(error) {
  return {
    type: types.CREATE_CUSTOMER_ERROR,
    error
  };
}

export const fetchAction = items => ({
  type: types.FETCH_CUSTOMER_DATA,
  items,
});

export const showDetailAction = item => ({
  type: types.SHOW_DETAIL_CUSTOMER,
  item,
});

export const hideDetailAction = {
  type: types.HIDE_DETAIL,
};

export const submitAction = (newData, avatar) => ({
  type: types.SUBMIT_CUSTOMER,
  newData,
  avatar
});

export const addAction = {
  type: types.ADD_CUSTOMER,
};

export const editAction = item => ({
  type: types.EDIT_CUSTOMER,
  item,
});

export const searchAction = keyword => ({
  type: types.SEARCH_CUSTOMER,
  keyword,
});

export const removeAction = item => ({
  type: types.DELETE_CUSTOMER,
  item,
});

export const closeAction = {
  type: types.CLOSE_CUSTOMER_FORM,
};

export const addToFavoriteAction = item => ({
  type: types.TOGGLE_FAVORITE,
  item,
});

export const closeNotifAction = {
  type: types.CLOSE_NOTIF
};
