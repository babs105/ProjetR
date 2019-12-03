import { fromJS, List, Map } from 'immutable';
import history from '../../utils/history';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from '../../actions/actionConstants';
const initialState = {
  userDetails: List([]),
  formValues: Map(),
  error: null,
};

const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return state.withMutations((mutableState) => {
        const items = fromJS(action.user);
        localStorage.setItem('user', action.user.sessionCookie);
        mutableState.set('userDetails', items);
        mutableState.set('error', null);
      });
    case LOGIN_FAILURE:
      return state.withMutations((mutableState) => {
        const error = fromJS(action.error);
        mutableState.set('error', error);
      });

    default:
      return state;
  }
}
