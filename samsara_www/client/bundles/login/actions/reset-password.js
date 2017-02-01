import { API_HOST } from 'lib/app-constants';
import ActionTypes from 'lib/action-types';
import makeFetch from 'lib/utils/make-fetch';


export default function resetPassword(email) {

  return (dispatch, getState) => {

    const state = getState();

    // if we're already fetching, don't fire another fetch
    if(state.user.isBusy === true) {
      return Promise.resolve();
    }

    const fetchOpts = {
      url           : API_HOST+'/password/reset',
      httpMethod    : 'POST',
      requestAction : passwordResetRequest,
      successAction : passwordResetSuccess,
      errorAction   : passwordResetError,
      token         : '', // leave a blank token when logging in
      body          : { email }
    };

    return makeFetch(fetchOpts, dispatch);

  }

}


function passwordResetRequest(requested) {
  return  {
    type : ActionTypes.PASSWORD_RESET_REQUEST,
    requested
  };
}

function passwordResetSuccess(confirmationMessage, retrieved) {
  return  {
    type : ActionTypes.PASSWORD_RESET_SUCCESS,
    confirmationMessage,
    retrieved
  };
}

function passwordResetError(code, message, retrieved) {
  return  {
    type : ActionTypes.PASSWORD_RESET_ERROR,
    retrieved,
    errors: [{ code, message }]
  };
}
