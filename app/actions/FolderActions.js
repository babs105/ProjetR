import * as types from './actionConstants';
import { folderService } from '../service/folderService';

export const folderActions = {
  createFolder,
  getAllFolder,
  deleteFolder,
  getAllDocument,
  getAllCaseWorker
};

function createFolder(data) {
  const dataArray = data.toJS();
  return dispatch => {
    folderService.createFolder(dataArray)
      .then(
        data => {
          dispatch(createSuccess(data));
        },
        error => {
          dispatch(createFailure('FAILURE CREATE'));
        }
      );
  };
}

function getAllFolder() {
  return dispatch => {
    folderService.getAllFolder()
      .then(
        data => {
          dispatch(success(data));
        },
        error => {
          dispatch(failure('FAILURE GET ALL FOLDER'));
        }
      );
  };
}

function getAllDocument(data) {
  return dispatch => {
    folderService.getAllDocument(data)
      .then(
        data => {
          dispatch(getAllDocumentSuccess(data));
        },
        error => {
          dispatch(getAllDocumentFailure('FAILURE GET ALL DOCUMENT'));
        }
      );
  };
}

function getAllCaseWorker(data) {
  return dispatch => {
    folderService.getAllCaseWorker(data)
      .then(
        data => {
          dispatch(getAllCaseWorkerSuccess(data));
        },
        error => {
          dispatch(getAllCaseWorkerFailure('FAILURE GET ALL CASEWORKER'));
        }
      );
  };
}


function deleteFolder(data) {
  const folderNumber = data.get('folderNumber');
  const data2 = data;
  return dispatch => {
    folderService.deleteFolder(folderNumber)
      .then(
        data => {
          dispatch(deleteSuccess(data2));
        },
        error => {
          dispatch(deleteFailure('FAILURE DELETE'));
        }
      );
  };
}

function success(items) {
  return {
    type: types.FOLDER_ALL_SUCCESS,
    items
  };
}

function getAllDocumentSuccess(items) {
  return {
    type: types.GET_ALL_DOCUMENT_SUCCESS,
    items
  };
}

function getAllCaseWorkerSuccess(items) {
  return {
    type: types.GET_ALL_CASEWORKER_SUCCESS,
    items
  };
}

function createSuccess(items) {
  return {
    type: types.CREATE_FOLDER_SUCCESS,
    items
  };
}

function deleteSuccess(item) {
  return {
    type: types.DELETE_FOLDER_SUCCESS,
    item
  };
}

function deleteFailure(error) {
  return {
    type: types.DELETE_FOLDER_ERROR,
    error
  };
}

function failure(error) {
  return {
    type: types.FOLDER_ALL_ERROR,
    error
  };
}

function getAllDocumentFailure(error) {
  return {
    type: types.GET_ALL_DOCUMENT_ERROR,
    error
  };
}

function getAllCaseWorkerFailure(error) {
  return {
    type: types.GET_ALL_CASEWORKER_ERROR,
    error
  };
}


function createFailure(error) {
  return {
    type: types.CREATE_FOLDER_ERROR,
    error
  };
}

export const fetchAction = (items, branch) => ({
  branch,
  type: `${branch}/${types.FETCH_DATA_FORM}`,
  items
});
export const addAction = (anchor, branch) => ({
  branch,
  type: `${branch}/${types.ADD_NEW}`,
  anchor
});
export const closeAction = branch => ({
  branch,
  type: `${branch}/${types.CLOSE_FORM}`
});
export const submitAction = (newData, branch) => ({
  branch,
  type: `${branch}/${types.SUBMIT_DATA}`,
  newData
});
export const removeAction = (item, branch) => ({
  branch,
  type: `${branch}/${types.REMOVE_ROW_FORM}`,
  item
});
export const editAction = (item, branch) => ({
  branch,
  type: `${branch}/${types.EDIT_ROW_FORM}`,
  item
});
export const closeNotifAction = branch => ({
  branch,
  type: `${branch}/${types.CLOSE_NOTIF}`,
});
