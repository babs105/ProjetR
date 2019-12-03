import { fromJS, List, Map } from 'immutable';
import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from '../../actions/actionConstants';

const initialState = {
  userDetails: List([]),
  formValues: Map(),
};


const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return state.withMutations((mutableState) => {
        const items = fromJS(action.user);
        mutableState.set('userDetails', items);
      });
    case REGISTER_FAILURE:
      console.log('error');
      console.log(action.error);
      return state.withMutations((mutableState) => {
        action.keyword.persist();
        const keyword = action.keyword.target.value.toLowerCase();
        mutableState.set('keywordValue', keyword);
      });
    default:
      return state;
  }
}
