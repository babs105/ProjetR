import * as types from './actionConstants';
import { caseWorkerService } from '../service/caseWorkerService';

export const caseWorkerActions = {
  createCaseWorker,
  getAllCaseWorker,
  deleteCaseWorker,
  getCaseWorker
};

function createCaseWorker(data, avatar) {
  const dataArray = data.toJS();
  return dispatch => {
    caseWorkerService.createCaseWorker(dataArray)
      .then(
        data => {
          dispatch(createSuccess(data, avatar));
        },
        error => {
          dispatch(createFailure('FAILURE CREATE CASE WORKER'));
        }
      );
  };
}

function getAllCaseWorker() {
  return dispatch => {
    caseWorkerService.getAllCaseWorker()
      .then(
        data => {
          dispatch(success(data));
        },
        error => {
          dispatch(failure('FAILURE GET ALL CASE WORKER'));
        }
      );
  };
}

function getCaseWorker(data) {
  const caseWorkerNumber = data.get('caseWorkerNumber');
  const data2 = data;
  return dispatch => {
    caseWorkerService.getCaseWorker(caseWorkerNumber)
      .then(
        data => {
          dispatch(getSuccess(data2));
        },
        error => {
          dispatch(getFailure('FAILURE GET CASE WORKER '));
        }
      );
  };
}

function deleteCaseWorker(data) {
  const caseWorkerNumber = data.get('caseWorkerNumber');
  const data2 = data;
  return dispatch => {
    caseWorkerService.deleteCaseWorker(caseWorkerNumber)
      .then(
        data => {
          dispatch(deleteSuccess(data2));
        },
        error => {
          dispatch(deleteFailure('FAILURE DELETE CASE WORKER'));
        }
      );
  };
}

function success(items) {
  return {
    type: types.CASEWORKER_ALL_SUCCESS,
    items
  };
}

function createSuccess(items, avatar) {
  return {
    type: types.CREATE_CASEWORKER_SUCCESS,
    items,
    avatar
  };
}

function deleteSuccess(item) {
  return {
    type: types.DELETE_CASEWORKER_SUCCESS,
    item
  };
}

function deleteFailure(error) {
  return {
    type: types.DELETE_CASEWORKER_ERROR,
    error
  };
}

function failure(error) {
  return {
    type: types.CASEWORKER_ALL_ERROR,
    error
  };
}

function getFailure(error) {
  return {
    type: types.GET_CASEWORKER_ERROR,
    error
  };
}

function getSuccess(items) {
  return {
    type: types.GET_CASEWORKER_SUCCESS,
    items
  };
}

function createFailure(error) {
  return {
    type: types.CREATE_CASEWORKER_ERROR,
    error
  };
}

export const fetchAction = items => ({
  type: types.FETCH_CASEWORKER_DATA,
  items,
});

export const showDetailAction = item => ({
  type: types.SHOW_DETAIL_CASEWORKER,
  item,
});

export const hideDetailAction = {
  type: types.HIDE_DETAIL,
};

export const submitAction = (newData, avatar) => ({
  type: types.SUBMIT_CASEWORKER,
  newData,
  avatar
});

export const addAction = {
  type: types.ADD_CASEWORKER,
};

export const editAction = item => ({
  type: types.EDIT_CASEWORKER,
  item,
});

export const searchAction = keyword => ({
  type: types.SEARCH_CASEWORKER,
  keyword,
});

export const removeAction = item => ({
  type: types.DELETE_CASEWORKER,
  item,
});

export const closeAction = {
  type: types.CLOSE_CASEWORKER_FORM,
};

export const addToFavoriteAction = item => ({
  type: types.TOGGLE_FAVORITE,
  item,
});

export const closeNotifAction = {
  type: types.CLOSE_NOTIF
};
