import ActionTypes from 'lib/action-types';
import makeFetch from 'lib/utils/make-fetch';

export default function changePassword(oldPassword, newPassword) {

  return (dispatch, getState) => {

    const state = getState();

    // if we're already fetching, don't fire another fetch
    if(state.user.isBusy === true) {
      return Promise.resolve();
    }

    const props = {
      oldPassword,
      password: newPassword,
      passwordConfirmation: newPassword
    };

    const fetchOpts = {
      url           : '/api/v2/profile/password',
      token         : state.user.data.accessToken,
      httpMethod    : 'PATCH',
      body          : props,
      requestAction : changePasswordRequest,
      successAction : changePasswordSuccess,
      errorAction   : changePasswordError
    };

    return makeFetch(fetchOpts, dispatch);

  }

}




function changePasswordRequest(requested) {
  return  {
    type : ActionTypes.CHANGE_PASSWORD_REQUEST,
    requested
  }
}

function changePasswordSuccess(data, retrieved) {
  return  {
            type      : ActionTypes.CHANGE_PASSWORD_SUCCESS,
            retrieved
          };
}

function changePasswordError(code, message, retrieved) {
  return  {
            type      : ActionTypes.CHANGE_PASSWORD_ERROR,
            error     : { statusCode, message },
            retrieved
          };
}
