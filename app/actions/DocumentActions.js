import * as types from './actionConstants';
import { documentService } from '../service/documentService';

export const documentActions = {
  createDocument,
  getAllDocument,
  deleteDocument
};

function createDocument(data) {
  const dataArray = data.toJS();
  return dispatch => {
    documentService.createDocument(dataArray)
      .then(
        data => {
          dispatch(createSuccess(data));
        },
        error => {
          dispatch(createFailure('FAILURE CREATE DOCUMENT'));
        }
      );
  };
}

function getAllDocument() {
  return dispatch => {
    documentService.getAllDocument()
      .then(
        data => {
          dispatch(success(data));
        },
        error => {
          dispatch(failure('FAILURE GET ALL DOCUMENT'));
        }
      );
  };
}

function deleteDocument(a, b) {
  const docNumbers = [];
  const docIndexes = [];
  a.data.forEach((item) => {
    docIndexes.push(item.index);
    docNumbers.push(b[item.index].data[0]);
  });
  return dispatch => {
    documentService.deleteDocument(docNumbers)
      .then(
        data => {
          dispatch(deleteSuccess(docIndexes));
        },
        error => {
          dispatch(deleteFailure('FAILURE DELETE DOCUMENT'));
        }
      );
  };
}

function success(items) {
  return {
    type: types.DOCUMENT_ALL_SUCCESS,
    items
  };
}

function createSuccess(items) {
  return {
    type: types.CREATE_DOCUMENT_SUCCESS,
    items
  };
}

function deleteSuccess(item) {
  return {
    type: types.DELETE_DOCUMENT_SUCCESS,
    item
  };
}

function deleteFailure(error) {
  return {
    type: types.DELETE_DOCUMENT_ERROR,
    error
  };
}

function failure(error) {
  return {
    type: types.DOCUMENT_ALL_ERROR,
    error
  };
}

function createFailure(error) {
  return {
    type: types.CREATE_DOCUMENT_ERROR,
    error
  };
}

export const closeNotifAction = branch => ({
  branch,
  type: `${branch}/${types.CLOSE_NOTIF}`,
});
