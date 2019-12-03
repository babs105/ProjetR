import * as types from '../actions/actionConstants';
import axios from '../axios/axios';
import { userService } from './userService';
import { getCookie } from '../utils/Cookie';

export const registrationService = {
    submitRegistration
  }
  
  function submitRegistration (register) {
    return axios.post('/lawyer/create', register).then(handleResponse)
      .then(register => {
        return register
      })
  }
  
  function handleResponse (response) {
    const data = response.data
    if (response.status == 401) {
      if (response.status === 401) {
        window.location.reload(true)
      }
      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }
    return data
  }
  