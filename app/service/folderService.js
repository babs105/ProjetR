import { Map } from 'immutable';
import axios from '../axios/axios';
export const folderService = {
  createFolder,
  getAllFolder,
  deleteFolder,
  getAllDocument,
  getAllCaseWorker
};

function createFolder(data) {
  const requestOptions = data;
  return axios.post('/folder/create', requestOptions).then(handleResponse)
    .then(folder => folder);
}

function deleteFolder(folderNumber) {
  return axios.delete('/folder/delete/' + folderNumber).then(handleResponse)
    .then(folder => folder);
}

function getAllFolder() {
  return axios.get('/folder/getAllFolder').then(handleResponse)
    .then(folder => folder);
}

function getAllDocument(data) {
  const folderNumber = data.get('folderNumber');
  return axios.get('/folder/getDocumentsByFolder/' + folderNumber).then(handleResponse)
    .then(folder => folder);
}

function getAllCaseWorker(data) {
  console.log('DATA');
  console.log(Map(data));
  const folderNumber = Map(data).get('folderNumber');
  console.log('FOLDERNUMBER');
  console.log(folderNumber);
  return axios.get('/folder/getCaseWorkerByFolder/' + folderNumber).then(handleResponse)
    .then(folder => folder);
}


function handleResponse(response) {
  const { data } = response;
  if (response.status === 401) {
    if (response.status === 401) {
      window.location.reload(true);
    }
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }
  return data;
}
