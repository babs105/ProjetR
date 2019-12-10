import { fromJS, List, Map } from 'immutable';
import notif from 'dan-api/ui/notifMessage';
import {
  CLOSE_NOTIF,
  GO_TO_NEXT_PAGE_SUCCESS,
  PREVIOUS_PAGE,
  GO_TO_DEMO,
  GO_TO_BASIC,
  GO_TO_PREMIUM,
  GO_TO_NEXT_PAGE_FAILURE,

} from '../../actions/actionConstants';


const initialState = {
  register: null,
  page: 0,
  error: null,
  steps: ['Company Info', 'Subscription', 'Confirmation'],
  isBasic: false,
  isPremium: true,
  isDemo: false,
  notifMsg: ''
};
const initialImmutableState = fromJS(initialState);

export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case GO_TO_NEXT_PAGE_SUCCESS:
      return state.withMutations((mutableState) => {
        console.log(action.register);
        const register = fromJS(action.register);

        const demo = state.get('isDemo');
        if (demo) {
          const page = state.get('page') + 2;
          mutableState.set('page', page);
        } else {
          const page = state.get('page') + 1;
          mutableState.set('page', page);
        }
        console.log(register);
        mutableState.set('register', register);
      });
    case PREVIOUS_PAGE:
      return state.withMutations((mutableState) => {
        const page = state.get('page') - 1;
        mutableState.set('page', page);
      });

    case GO_TO_DEMO:
      return state.withMutations((mutableState) => {
        const demo = !state.get('isDemo');
        if (demo) {
          mutableState.set('steps', ['Company Info', 'Confirmation']);
        } else {
          mutableState.set('steps', ['Company Info', 'Subscription', 'Confirmation']);
        }
        mutableState.set('isDemo', demo);
      });
    case GO_TO_BASIC:
      return state.withMutations((mutableState) => {
        const basicPack = state.get('isBasic');
        const premiumPack = state.get('isPremium');
        if (basicPack) {
          mutableState.set('isBasic', basicPack);
        } else {
          mutableState.set('isBasic', !basicPack);
        }
        if (premiumPack) {
          mutableState.set('isPremium', !premiumPack);
        }
      });
    case GO_TO_PREMIUM:
      return state.withMutations((mutableState) => {
        const basicPack = state.get('isBasic');
        const premiumPack = state.get('isPremium');
        if (premiumPack) {
          mutableState.set('isPremium', premiumPack);
        } else {
          mutableState.set('isPremium', !premiumPack);
        }
        if (basicPack) {
          mutableState.set('isBasic', !basicPack);
        }
      });
    case GO_TO_NEXT_PAGE_FAILURE:
      return state.withMutations((mutableState) => {
        mutableState.set('notifMsg', action.error);
      });
    case CLOSE_NOTIF:
      return state.withMutations((mutableState) => {
        mutableState.set('notifMsg', '');
      });
    default:

      return state;
  }
}
