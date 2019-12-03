import axios from '../axios/axios';

export const userService = {
  login,
  logout,
  loginExistingUser,
  register
};


function login(username, password) {
  const requestOptions = { username, password };
  return axios.post('/users/authenticate', requestOptions).then(handleResponse)
    .then(user => user);
}

function register(data) {
  console.log(data);
  return axios.post('/users/create', data).then(handleRegisterResponse)
    .then(user => user);
}

function loginExistingUser(cookie) {
  const headers = { 'x-authenticate-user': cookie };
  const requestOptions = { headers };
  // eslint-disable-next-line no-use-before-define
  return axios.get('/users/loggedInUser', requestOptions).then(handleResponse)
    .then(user => user);
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function handleResponse(response) {
  const { data } = response;
  if (response.status === 401) {
    if (response.status === 401) {
      // auto logout if 401 response returned from api
      logout();
      // eslint-disable-next-line no-restricted-globals
      location.reload(true);
    }

    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  return data;
}

function handleRegisterResponse(response) {
  const { data } = response;
  if (response.status === 401) {
    const error = (data && data.message) || response.statusText;
    console.log('handleRegisterResponse => error');
    console.log(error);
    return Promise.reject(error);
  }

  return data;
}
