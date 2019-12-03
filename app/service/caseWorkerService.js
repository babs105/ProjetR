import axios from '../axios/axios';

export const caseWorkerService = {
  createCaseWorker,
  getAllCaseWorker,
  getCaseWorker,
  deleteCaseWorker,
};

function createCaseWorker(data) {
  const requestOptions = data;
  return axios.post('/caseWorker/create', requestOptions).then(handleResponse)
    .then(caseWorker => caseWorker);
}

function deleteCaseWorker(caseWorkerNumber) {
  return axios.delete('/caseWorker/delete/' + caseWorkerNumber).then(handleResponse)
    .then(caseWorker => caseWorker);
}

function getCaseWorker(caseWorkerNumber) {
  return axios.get('/caseWorker/getCaseWorker/' + caseWorkerNumber).then(handleResponse)
    .then(caseWorker => caseWorker);
}


function getAllCaseWorker() {
  return axios.get('/caseWorker/getAllCaseWorker').then(handleResponse)
    .then(caseWorker => caseWorker);
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
