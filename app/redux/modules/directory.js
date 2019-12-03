import { fromJS, List, Map } from 'immutable';
import notif from 'dan-api/ui/notifMessage';
import {
  FETCH_DATA_FORM,
  ADD_NEW,
  CLOSE_FORM,
  CREATE_DIRECTORY_SUCCESS,
  CREATE_DIRECTORY_ERROR,
  DELETE_DIRECTORY_SUCCESS,
  DELETE_DIRECTORY_ERROR,
  EDIT_ROW_FORM,
  CLOSE_NOTIF,
  DIRECTORY_ALL_ERROR,
  DIRECTORY_ALL_SUCCESS
} from '../../actions/actionConstants';

const initialState = {
  dataTable: List([]),
  formValues: Map(),
  editingId: '',
  showFrm: false,
  notifMsg: '',
};

const initialItem = (keyTemplate, anchor) => {
  const staticKey = {};
  if (keyTemplate) {
    const [...rawKey] = keyTemplate.keys();
    for (let i = 0; i < rawKey.length; i += 1) {
      if (rawKey[i] !== 'id' && rawKey[i] !== 'folders') {
        const itemIndex = anchor.findIndex(a => a.name === rawKey[i]);
        staticKey[rawKey[i]] = anchor[itemIndex].initialValue;
      }
    }
  } else {
    staticKey[0] = anchor[0].initialValue;
  }
  return Map(staticKey);
};
let editingIndex = 0;

const initialImmutableState = fromJS(initialState);


export default function reducer(state = initialImmutableState, action = {}) {
  const { branch } = action;
  switch (action.type) {
    case DIRECTORY_ALL_SUCCESS:
      return state.withMutations((mutableState) => {
        const items = fromJS(action.items);
        mutableState.set('dataTable', items);
      });
    case `${branch}/${FETCH_DATA_FORM}`:
      return state.withMutations((mutableState) => {
        const items = fromJS(action.items);
        mutableState.set('dataTable', items);
      });
    case `${branch}/${ADD_NEW}`:
      return state.withMutations((mutableState) => {
        /* const raw = state.get('dataTable').last();
        const initial = initialItem(raw, action.anchor);
        mutableState.set('formValues', initial); */
        mutableState.set('showFrm', true);
      });
    case CREATE_DIRECTORY_SUCCESS:
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
    case `${branch}/${CLOSE_FORM}`:
      return state.withMutations((mutableState) => {
        mutableState
          .set('formValues', Map())
          .set('showFrm', false);
      });
    case DELETE_DIRECTORY_SUCCESS:
      return state.withMutations((mutableState) => {
        const index = state.get('dataTable').indexOf(action.item);
        mutableState
          .update('dataTable', dataTable => dataTable.splice(index, 1))
          .set('notifMsg', notif.removed);
      });
    case `${branch}/${EDIT_ROW_FORM}`:
      return state.withMutations((mutableState) => {
        editingIndex = state.get('dataTable').indexOf(action.item);
        mutableState
          .set('formValues', action.item)
          .set('editingId', action.item.get('id'))
          .set('showFrm', true);
      });
    case `${branch}/${CLOSE_NOTIF}`:
      return state.withMutations((mutableState) => {
        mutableState.set('notifMsg', '');
      });

    case DELETE_DIRECTORY_ERROR:
      return state.withMutations((mutableState) => {
        mutableState.set('notifMsg', action.error);
      });
    case CREATE_DIRECTORY_ERROR:
      return state.withMutations((mutableState) => {
        mutableState.set('notifMsg', action.error);
      });
    case DIRECTORY_ALL_ERROR:
      return state.withMutations((mutableState) => {
        mutableState.set('notifMsg', action.error);
      });
    default:
      return state;
  }
}
