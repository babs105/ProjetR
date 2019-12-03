import * as types from './actionConstants';
import { timeLineService } from '../service/timeLineService';
import { userService } from '../service/userService';
import { setCookie, deleteAllCookies, getCookie } from '../utils/Cookie';

export const timeLineActions = {
  getAllTimeLine,
};


function getAllTimeLine() {
  return dispatch => {
    timeLineService.getAllTimeLine().then(data => {
      dispatch(success(data));
    },
    error => {
      dispatch(failure('FAILURE GET ALL TIMELINE'));
    }
    );
  };
}

function success(items) {
  return {
    type: types.TIMELINE_ALL_SUCCESS,
    items
  };
}

function failure(error) {
  return {
    type: types.TIMELINE_ALL_ERROR,
    error
  };
}

export const fetchAction = items => ({
  type: types.FETCH_TIMELINE_DATA,
  items,
});

export const postAction = (text, media, privacy) => ({
  type: types.POST,
  text,
  media,
  privacy
});

export const toggleLikeAction = item => ({
  type: types.TOGGLE_LIKE,
  item,
});

export const fetchCommentAction = item => ({
  type: types.FETCH_COMMENT_DATA,
  item,
});

export const postCommentAction = (comment) => ({
  type: types.POST_COMMENT,
  comment,
});

export const closeNotifAction = {
  type: types.CLOSE_NOTIF
};
