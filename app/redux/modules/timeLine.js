import { fromJS, List, Map } from 'immutable';
import notif from 'dan-api/ui/notifMessage';
import {
  CLOSE_NOTIF,
  TIMELINE_ALL_SUCCESS,
  TIMELINE_ALL_ERROR,
  GET_ALL_TIMELINE_BY_USER_SUCCESS,
  GET_ALL_TIMELINE_BY_USER_ERROR,
  FETCH_TIMELINE_DATA,
  POST,
  TOGGLE_LIKE,
  FETCH_COMMENT_DATA,
  POST_COMMENT

} from '../../actions/actionConstants';
import { getDate, getTime } from '../helpers/dateTimeHelper';

const initialState = {
  timeLineList: List([]),
  commentIndex: 0,
  notifMsg: '',
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case TIMELINE_ALL_SUCCESS:
      return state.withMutations((mutableState) => {
        const items = fromJS(action.items);
        mutableState.set('timeLineList', items);
      });
    case GET_ALL_TIMELINE_BY_USER_SUCCESS:
      return state.withMutations((mutableState) => {
        const items = fromJS(action.items);
        mutableState.set('timeLineList', items);
      });
    case CLOSE_NOTIF:
      return state.withMutations((mutableState) => {
        mutableState.set('notifMsg', '');
      });
    case TIMELINE_ALL_ERROR:
      return state.withMutations((mutableState) => {
        mutableState.set('notifMsg', action.error);
      });
    case GET_ALL_TIMELINE_BY_USER_ERROR:
      return state.withMutations((mutableState) => {
        mutableState.set('notifMsg', action.error);
      });
    case FETCH_TIMELINE_DATA:
      return state.withMutations((mutableState) => {
        const items = fromJS(action.items);
        mutableState.set('timeLineList', items);
      });
    case POST:
      return state.withMutations((mutableState) => {
        mutableState
          .update(
            'timeLineList',
            dataTimeline => dataTimeline.unshift(
              buildTimeline(action.text, action.media, action.privacy)
            )
          )
          .set('notifMsg', notif.posted);
      });
    case TOGGLE_LIKE:
      return state.withMutations((mutableState) => {
        const index = state.get('timeLineList').indexOf(action.item);
        mutableState.update('timeLineList', dataTimeline => dataTimeline
          .setIn([index, 'liked'], !state.getIn(['timeLineList', index, 'liked']))
        );
      });
    case FETCH_COMMENT_DATA:
      return state.withMutations((mutableState) => {
        const index = state.get('timeLineList').indexOf(action.item);
        mutableState.set('commentIndex', index);
      });
    case POST_COMMENT:
      return state.withMutations((mutableState) => {
        mutableState
          .update('timeLineList',
            dataTimeline => dataTimeline.setIn(
              [state.get('commentIndex'), 'comments'],
              buildComment(action.comment, state.getIn(['timeLineList', state.get('commentIndex'), 'comments']))
            )
          )
          .set('notifMsg', notif.commented);
      });
    default:

      return state;
  }
}
