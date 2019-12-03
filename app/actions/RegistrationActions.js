import { registrationService } from '../service/registrationService'
import * as types from './actionConstants';

export const registrationActions = {
  submitRegistration,
  goToNextPage,
  goToNextPageTest,
  goToPreviousPage,
  goToDemo,
  goToBasic,
  goToPremium
}

function submitRegistration (register) {
    return dispatch => {
        registrationService.submitRegistration(register)
              .then(
                  data => {
                    dispatch(success(data.register))
                  },
                  error => {
                    dispatch(failure('Register submission failed'))
                  }
            )
    }
  }

function goToNextPage(data) {
  console.log("REGISTER",data)
    return dispatch => {
       registrationService.submitRegistration(data)
        .then(
          data => {
          dispatch(success(data))
        },
        error => {
          dispatch(failure('Go to Next Page failed'))
        }
      )
    }
}

function goToNextPageTest(data) {
  console.log("REGISTER",data)
    return dispatch => {
      dispatch(success(data))
       
    }
}

function goToDemo(){
  return {
    type: types.GO_TO_DEMO
  }

}
function goToBasic(){
  return {
    type: types.GO_TO_BASIC
  }

}
function goToPremium(){
  return {
    type: types.GO_TO_PREMIUM
  }

}

function goToPreviousPage () {
    return {
      type: types.PREVIOUS_PAGE,
    }
}

function success (register) {
    return {
      type: types.GO_TO_NEXT_PAGE_SUCCESS,
      register
    }
  }
  function failure (error) {
    return {
      type: types.GO_TO_NEXT_PAGE_FAILURE,
      error
    }
  }