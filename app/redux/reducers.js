/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import history from 'utils/history';

import languageProviderReducer from 'containers/LanguageProvider/reducer';
import uiReducer from './modules/ui';
import treeTable from './modules/treeTable';
import crudTable from './modules/crudTable';
import crudTableForm from './modules/crudTableForm';
import initval from './modules/initForm';
import login from './modules/login';
import directory from './modules/directory';
import folder from './modules/folder';
import caseWorker from './modules/caseWorker';
import customer from './modules/customer';
import socmed from './modules/socialMedia';
import ecommerce from './modules/ecommerce';
import contact from './modules/contact';
import chat from './modules/chat';
import email from './modules/email';
import calendar from './modules/calendar';
import taskboard from './modules/taskboard';
import register from './modules/register';
import document from './modules/document';
import timeLine from './modules/timeLine';
import registration from './modules/registration';

/**
 * Branching reducers to use one reducer for many components
 */

function branchReducer(reducerFunction, reducerName) {
  return (state, action) => {
    const { branch } = action;
    const isInitializationCall = state === undefined;
    if (branch !== reducerName && !isInitializationCall) {
      return state;
    }
    return reducerFunction(state, action);
  };
}

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    form,
    ui: uiReducer,
    initval,
    login,
    directory,
    folder,
    document,
    customer,
    caseWorker,
    timeLine,
    registration,
    socmed,
    calendar,
    ecommerce,
    contact,
    chat,
    email,
    taskboard,
    register,
    treeTableArrow: branchReducer(treeTable, 'treeTableArrow'),
    treeTablePM: branchReducer(treeTable, 'treeTablePM'),
    crudTableDemo: branchReducer(crudTable, 'crudTableDemo'),
    crudTableForm,
    crudTableForm: branchReducer(directory, 'crudTableForm'),
    crudTbFrmDemo: branchReducer(crudTableForm, 'crudTbFrmDemo'),
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}
