import * as types from './actionConstants';
import { userService } from '../service/userService';

export const registerActions = {
  register
};

export const registerBB = (data) => ({ type: types.REGISTER_SUCCESS, data });
export const clearAction = { type: types.CLEAR };

function register(data) {
  return dispatch => {
    userService.register(data)
      .then(
        data => {
          dispatch(success(data));
        },
        error => {
          dispatch(failure('Username or password is incorrect'));
        }
      );
  };
}

function success(user) {
  return {
    type: types.REGISTER_SUCCESS,
    user
  };
}

function failure(error) {
  return {
    type: types.REGISTER_FAILURE,
    error
  };
}
