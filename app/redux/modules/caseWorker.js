import { fromJS, List, Map } from 'immutable';
import notif from 'dan-api/ui/notifMessage';
import {
  FETCH_CASEWORKER_DATA,
  SEARCH_CASEWORKER,
  HIDE_DETAIL,
  EDIT_CASEWORKER,
  TOGGLE_FAVORITE,
  ADD_CASEWORKER,
  CLOSE_CASEWORKER_FORM,
  CLOSE_NOTIF,
  GET_CASEWORKER_SUCCESS,
  GET_CASEWORKER_ERROR,
  GET_ALL_CASEWORKER_SUCCESS,
  GET_ALL_CASEWORKER_ERROR,
  CREATE_CASEWORKER_SUCCESS,
  CREATE_CASEWORKER_ERROR,
  DELETE_CASEWORKER_SUCCESS,
  DELETE_CASEWORKER_ERROR
} from '../../actions/actionConstants';

const initialState = {
  caseWorkerList: List([]),
  formValues: Map(),
  selectedIndex: 0,
  selectedId: '',
  keywordValue: '',
  avatarInit: '',
  openFrm: false,
  showMobileDetail: false,
  notifMsg: '',
};
let editingIndex = 0;

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case GET_ALL_CASEWORKER_SUCCESS:
      return state.withMutations((mutableState) => {
        const items = fromJS(action.items);
        mutableState.set('caseWorkerList', items);
      });
    case FETCH_CASEWORKER_DATA:
      return state.withMutations((mutableState) => {
        const items = fromJS(action.items);
        mutableState.set('caseWorkerList', items);
      });
    case SEARCH_CASEWORKER:
      return state.withMutations((mutableState) => {
        action.keyword.persist();
        const keyword = action.keyword.target.value.toLowerCase();
        mutableState.set('keywordValue', keyword);
      });
    case ADD_CASEWORKER:
      return state.withMutations((mutableState) => {
        mutableState
          .set('openFrm', true)
          .set('formValues', Map([]))
          .set('avatarInit', '');
      });
    case CLOSE_CASEWORKER_FORM:
      return state.withMutations((mutableState) => {
        mutableState
          .set('openFrm', false)
          .set('formValues', null)
          .set('avatarInit', '')
          .set('notifMsg', notif.discard);
      });
    case EDIT_CASEWORKER:
      return state.withMutations((mutableState) => {
        console.log('caseWorkerEdit');
        console.log(action.item);
        editingIndex = state.get('caseWorkerList').indexOf(action.item);
        mutableState
          .set('openFrm', true)
          .set('selectedId', action.item.get('id'))
          .set('formValues', action.item)
          .set('avatarInit', action.item.get('avatar'));
      });
    case CREATE_CASEWORKER_SUCCESS:
      return state.withMutations((mutableState) => {
        action.newData = action.items;
        const initItem = Map(action.newData);
        if (state.get('selectedId') === Map(action.newData).get('id')) {
          // Update data
          const avatar = action.avatar !== '' ? action.avatar : state.get('avatarInit');
          const newItem = initItem.update((initUpdated) => (initUpdated.set('avatar', avatar)));
          mutableState
            .update('caseWorkerList', caseWorkerList => caseWorkerList.setIn(
              [editingIndex], newItem
            ))
            .set('notifMsg', notif.updated);
        } else {
          // Insert data
          const avatar = action.avatar !== '' ? action.avatar : '/images/pp_boy.svg';
          const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
          const newItem = initItem
            .update('id', (val = id) => val)
            .update('avatar', (val = avatar) => val)
            .update('favorited', (val = false) => val);
          mutableState
            .update('caseWorkerList', caseWorkerList => caseWorkerList.unshift(newItem))
            .set('selectedIndex', 0)
            .set('notifMsg', notif.saved);
        }
        mutableState
          .set('formValues', null)
          .set('avatarInit', '')
          .set('openFrm', false);
      });
    case GET_CASEWORKER_SUCCESS:
      return state.withMutations((mutableState) => {
        const index = state.get('caseWorkerList').indexOf(action.items);
        mutableState
          .set('selectedIndex', index)
          .set('showMobileDetail', true);
      });
    case HIDE_DETAIL:
      return state.withMutations((mutableState) => {
        mutableState.set('showMobileDetail', false);
      });
    case DELETE_CASEWORKER_SUCCESS:
      return state.withMutations((mutableState) => {
        const index = state.get('caseWorkerList').indexOf(action.item);
        mutableState
          .update('caseWorkerList', caseWorkerList => caseWorkerList.splice(index, 1))
          .set('notifMsg', notif.removed);
      });
    case TOGGLE_FAVORITE:
      return state.withMutations((mutableState) => {
        const index = state.get('caseWorkerList').indexOf(action.item);
        mutableState.update('caseWorkerList', caseWorkerList => caseWorkerList
          .setIn([index, 'favorited'], !state.getIn(['caseWorkerList', index, 'favorited']))
        );
      });
    case CLOSE_NOTIF:
      return state.withMutations((mutableState) => {
        mutableState.set('notifMsg', '');
      });
    case DELETE_CASEWORKER_ERROR:
      return state.withMutations((mutableState) => {
        mutableState.set('notifMsg', action.error);
      });
    case GET_CASEWORKER_ERROR:
      return state.withMutations((mutableState) => {
        mutableState.set('notifMsg', action.error);
      });
    case CREATE_CASEWORKER_ERROR:
      return state.withMutations((mutableState) => {
        mutableState.set('notifMsg', action.error);
      });
    case GET_ALL_CASEWORKER_ERROR:
      return state.withMutations((mutableState) => {
        mutableState.set('notifMsg', action.error);
      });
    default:
      return state;
  }
}
