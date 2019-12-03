import * as types from './actionConstants';
import { userService } from '../service/userService';
import history from '../utils/history';
import { setCookie, deleteAllCookies, getCookie } from '../utils/Cookie';

export const loginActions = {
  login
};

export const loginBB = (data) => ({ type: types.LOGIN_SUCCESS, data });
export const clearAction = { type: types.CLEAR };

function login(values) {
  return dispatch => {
    userService.login(values.get('username'), values.get('password'))
      .then(
        data => {
          console.log('USER', data.user);
          setCookie(types.LOGIN_COOKIE, data.sessionCookie);
          dispatch(success(data));
          if (!history.location.state) {
            history.push('/app');
          } else {
            history.push(history.location.state.from.pathname);
          }
        },
        error => {
          dispatch(failure('username or password is incorrect'));
        }
      );
  };
}

function success(user) {
  return {
    type: types.LOGIN_SUCCESS,
    user
  };
}

function failure(error) {
  return {
    type: types.LOGIN_FAILURE,
    error
  };
}
