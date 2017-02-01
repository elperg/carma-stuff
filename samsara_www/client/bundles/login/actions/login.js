import { API_HOST } from 'lib/app-constants';
import ActionTypes from 'lib/action-types';
import makeFetch from 'lib/utils/make-fetch';


export default function login(email, password) {

  return (dispatch, getState) => {

    const state = getState();

    // if we're already fetching, don't fire another fetch
    if(state.user.isBusy === true) {
      return Promise.resolve();
    }

    const fetchOpts = {
      url           : '/api/v2/login',
      httpMethod    : 'POST',
      requestAction : loginRequest,
      successAction : loginSuccess,
      errorAction   : loginError,
      token         : '', // leave a blank token when logging in
      body          : { email, password }
    };

    return makeFetch(fetchOpts, dispatch);

  }

}


function loginRequest(requested) {
  return  {
    type : ActionTypes.LOGIN_REQUEST,
    requested
  };
}

function loginSuccess(data, retrieved, redirectUri) {

  // data returned will be user ID & access token
  localStorage.setItem('samsara-user', JSON.stringify(data));

  return  {
    type : ActionTypes.LOGIN_SUCCESS,
    data,
    retrieved
  };
}

function loginError(code, message, retrieved) {
  return  {
    type : ActionTypes.LOGIN_ERROR,
    retrieved,
    errors: [{ code, message }]
  };
}
