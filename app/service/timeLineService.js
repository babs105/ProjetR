import * as types from '../actions/actionConstants';
import axios from '../axios/axios';
import { userService } from './userService';
import { getCookie } from '../utils/Cookie';

export const timeLineService = {
  getAllTimeLine,
};
function getAllTimeLine() {
  return userService.loginExistingUser(getCookie(types.LOGIN_COOKIE))
    .then(data => axios.get('/timeLine/getTimelineActivityByUser/' + data.user.id))
    .then(handleResponse).then(timeLine => timeLine);
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
