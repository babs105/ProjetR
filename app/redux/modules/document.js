import { fromJS, List, Map } from 'immutable';
import notif from 'dan-api/ui/notifMessage';
import {
  GET_ALL_DOCUMENT_ERROR,
  GET_ALL_DOCUMENT_SUCCESS,
  DELETE_DOCUMENT_SUCCESS,
  CLOSE_NOTIF,
  DELETE_DOCUMENT_ERROR,
  CREATE_DOCUMENT_SUCCESS
} from '../../actions/actionConstants';

const initialState = {
  dataTable: List([]),
  formValues: Map(),
  editingId: '',
  showFrm: false,
  notifMsg: '',
};

const editingIndex = 0;

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  const { branch } = action;
  switch (action.type) {
    case GET_ALL_DOCUMENT_SUCCESS:
      return state.withMutations((mutableState) => {
        const items = fromJS(action.items);
        mutableState
          .set('dataTable', items)
          .set('notifMsg', notif.getAll);
      });
    case GET_ALL_DOCUMENT_ERROR:
      return state.withMutations((mutableState) => {
        mutableState.set('notifMsg', action.error);
      });
    case DELETE_DOCUMENT_SUCCESS:
      return state.withMutations((mutableState) => {
        const index = state.get('dataTable').indexOf(action.item);
        mutableState
          .update('dataTable', dataTable => dataTable.splice(index, 1))
          .set('notifMsg', notif.removed);
      });
    case DELETE_DOCUMENT_ERROR:
      return state.withMutations((mutableState) => {
        mutableState.set('notifMsg', action.error);
      });
    case CREATE_DOCUMENT_SUCCESS:
      return state.withMutations((mutableState) => {
        action.newData = action.items;
        if (state.get('editingId') === Map(action.newData).get('id')) {
          // Update data
          mutableState
            .update('dataTable', dataTable => dataTable.setIn([editingIndex], Map(action.newData)))
            .set('notifMsg', notif.updated);
        } else {
          // Insert data
          const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
          const initItem = Map(action.newData);
          const newItem = initItem.update('id', (val = id) => val);
          mutableState
            .update('dataTable', dataTable => dataTable.unshift(newItem))
            .set('notifMsg', notif.saved);
        }
        mutableState.set('showFrm', false);
        mutableState.set('formValues', Map());
      });
    case `${branch}/${CLOSE_NOTIF}`:
      return state.withMutations((mutableState) => {
        mutableState.set('notifMsg', '');
      });
    default:
      return state;
  }
}
