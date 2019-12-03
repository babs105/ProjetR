import axios from '../axios/axios';

export const documentService = {
  createDocument,
  getAllDocument,
  deleteDocument,
};

function createDocument(data) {
  const requestOptions = data;
  return axios.post('/document/create', requestOptions).then(handleResponse)
    .then(document => document);
}

function deleteDocument(documentNumber) {
  return axios.delete('/document/delete/' + documentNumber).then(handleResponse)
    .then(document => document);
}


function getAllDocument() {
  return axios.get('/document/getAllDocument').then(handleResponse)
    .then(document => document);
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
