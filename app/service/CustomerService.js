import axios from '../axios/axios';

export const customerService = {
  createCustomer,
  getAllCustomer,
  getCustomer,
  deleteCustomer,
};

function createCustomer(data) {
  const requestOptions = data;
  return axios.post('/customer/create', requestOptions).then(handleResponse)
    .then(customer => customer);
}

function deleteCustomer(customerNumber) {
  return axios.delete('/customer/delete/' + customerNumber).then(handleResponse)
    .then(customer => customer);
}

function getCustomer(customerNumber) {
  return axios.get('/customer/getCustomer/' + customerNumber).then(handleResponse)
    .then(customer => customer);
}


function getAllCustomer() {
  return axios.get('/customer/getAllCustomer').then(handleResponse)
    .then(customer => customer);
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
