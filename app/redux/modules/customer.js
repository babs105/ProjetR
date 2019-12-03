import { fromJS, List, Map } from 'immutable';
import notif from 'dan-api/ui/notifMessage';
import {
  FETCH_CUSTOMER_DATA,
  SEARCH_CUSTOMER,
  HIDE_DETAIL,
  EDIT_CUSTOMER,
  TOGGLE_FAVORITE,
  ADD_CUSTOMER,
  CLOSE_CUSTOMER_FORM,
  CLOSE_NOTIF,
  GET_CUSTOMER_SUCCESS,
  GET_CUSTOMER_ERROR,
  CUSTOMER_ALL_SUCCESS,
  CUSTOMER_ALL_ERROR,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_ERROR,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_ERROR
} from '../../actions/actionConstants';

const initialState = {
  customerList: List([]),
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
    case CUSTOMER_ALL_SUCCESS:
      return state.withMutations((mutableState) => {
        const items = fromJS(action.items);
        mutableState.set('customerList', items);
      });
    case FETCH_CUSTOMER_DATA:
      return state.withMutations((mutableState) => {
        const items = fromJS(action.items);
        mutableState.set('customerList', items);
      });
    case SEARCH_CUSTOMER:
      return state.withMutations((mutableState) => {
        action.keyword.persist();
        const keyword = action.keyword.target.value.toLowerCase();
        mutableState.set('keywordValue', keyword);
      });
    case ADD_CUSTOMER:
      return state.withMutations((mutableState) => {
        mutableState
          .set('openFrm', true)
          .set('formValues', Map([]))
          .set('avatarInit', '');
      });
    case CLOSE_CUSTOMER_FORM:
      return state.withMutations((mutableState) => {
        mutableState
          .set('openFrm', false)
          .set('formValues', null)
          .set('avatarInit', '')
          .set('notifMsg', notif.discard);
      });
    case EDIT_CUSTOMER:
      return state.withMutations((mutableState) => {
        editingIndex = state.get('customerList').indexOf(action.item);
        mutableState
          .set('openFrm', true)
          .set('selectedId', action.item.get('id'))
          .set('formValues', action.item)
          .set('avatarInit', action.item.get('avatar'));
      });
    case CREATE_CUSTOMER_SUCCESS:
      return state.withMutations((mutableState) => {
        action.newData = action.items;
        const initItem = Map(action.newData);
        if (state.get('selectedId') === Map(action.newData).get('id')) {
          // Update data
          const avatar = action.avatar !== '' ? action.avatar : state.get('avatarInit');
          const newItem = initItem.update((initUpdated) => (initUpdated.set('avatar', avatar)));
          mutableState
            .update('customerList', customerList => customerList.setIn(
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
            .update('customerList', customerList => customerList.unshift(newItem))
            .set('selectedIndex', 0)
            .set('notifMsg', notif.saved);
        }
        mutableState
          .set('formValues', null)
          .set('avatarInit', '')
          .set('openFrm', false);
      });
    case GET_CUSTOMER_SUCCESS:
      return state.withMutations((mutableState) => {
        const index = state.get('customerList').indexOf(action.items);
        mutableState
          .set('selectedIndex', index)
          .set('showMobileDetail', true);
      });
    case HIDE_DETAIL:
      return state.withMutations((mutableState) => {
        mutableState.set('showMobileDetail', false);
      });
    case DELETE_CUSTOMER_SUCCESS:
      return state.withMutations((mutableState) => {
        const index = state.get('customerList').indexOf(action.item);
        mutableState
          .update('customerList', customerList => customerList.splice(index, 1))
          .set('notifMsg', notif.removed);
      });
    case TOGGLE_FAVORITE:
      return state.withMutations((mutableState) => {
        const index = state.get('customerList').indexOf(action.item);
        mutableState.update('customerList', customerList => customerList
          .setIn([index, 'favorited'], !state.getIn(['customerList', index, 'favorited']))
        );
      });
    case CLOSE_NOTIF:
      return state.withMutations((mutableState) => {
        mutableState.set('notifMsg', '');
      });
    case DELETE_CUSTOMER_ERROR:
      return state.withMutations((mutableState) => {
        mutableState.set('notifMsg', action.error);
      });
    case GET_CUSTOMER_ERROR:
      return state.withMutations((mutableState) => {
        mutableState.set('notifMsg', action.error);
      });
    case CREATE_CUSTOMER_ERROR:
      return state.withMutations((mutableState) => {
        mutableState.set('notifMsg', action.error);
      });
    case CUSTOMER_ALL_ERROR:
      return state.withMutations((mutableState) => {
        mutableState.set('notifMsg', action.error);
      });
    default:
      return state;
  }
}
