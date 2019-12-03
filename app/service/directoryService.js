import axios from '../axios/axios';

export const directoryService = {
  createDirectory,
  getAll,
  deleteDirectory,
  getAllFolders,
};

function createDirectory(data) {
  console.log('Create dans Service ');
  console.log(data);
  const requestOptions = data;
  return axios.post('/directory/create', requestOptions).then(handleResponse)
    .then(directory => directory);
}

function deleteDirectory(directoryNumber) {
  return axios.delete('/directory/delete/' + directoryNumber).then(handleResponse)
    .then(directory => directory);
}

function getAll() {
  return axios.get('/directory/getAllDirectory').then(handleResponse)
    .then(directory => directory);
}

function getAllFolders(data) {
  const directoryNumber = data.get('directoryNumber');
  return axios.get('/directory/getFolderByDirectory/' + directoryNumber).then(handleResponse)
    .then(directory => directory);
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
