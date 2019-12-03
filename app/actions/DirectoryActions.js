import * as types from './actionConstants';
import { directoryService } from '../service/directoryService';

export const directoryActions = {
  createDirectory,
  getAll,
  deleteDirectory,
  getAllFolder
};

function createDirectory(data) {
  const dataArray = data.toJS();
  return dispatch => {
    directoryService.createDirectory(dataArray)
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

function getAll() {
  return dispatch => {
    directoryService.getAll()
      .then(
        data => {
          dispatch(success(data));
        },
        error => {
          dispatch(failure('FAILURE GET ALL'));
        }
      );
  };
}

function getAllFolder(data) {
  return dispatch => {
    directoryService.getAllFolders(data)
      .then(
        data => {
          dispatch(getAllFoldersSuccess(data));
        },
        error => {
          dispatch(getAllFoldersFailure('FAILURE GET ALL FOLDER'));
        }
      );
  };
}

function deleteDirectory(data) {
  const directoryNumber = data.get('directoryNumber');
  const data2 = data;
  return dispatch => {
    directoryService.deleteDirectory(directoryNumber)
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
    type: types.DIRECTORY_ALL_SUCCESS,
    items
  };
}

function createSuccess(items) {
  return {
    type: types.CREATE_DIRECTORY_SUCCESS,
    items
  };
}

function deleteSuccess(item) {
  return {
    type: types.DELETE_DIRECTORY_SUCCESS,
    item
  };
}

function getAllFoldersSuccess(item) {
  return {
    type: types.GET_ALL_FOLDER_SUCCESS,
    item
  };
}

function getAllFoldersFailure(error) {
  return {
    type: types.GET_ALL_FOLDER_FAILURE,
    error
  };
}

function deleteFailure(error) {
  return {
    type: types.DELETE_DIRECTORY_ERROR,
    error
  };
}

function failure(error) {
  return {
    type: types.DIRECTORY_ALL_ERROR,
    error
  };
}

function createFailure(error) {
  return {
    type: types.CREATE_DIRECTORY_ERROR,
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
export const onClickRow = (item, branch) => ({
  branch,
  type: `${branch}/${types.ONCLICK_ROW}`,
  item
});
