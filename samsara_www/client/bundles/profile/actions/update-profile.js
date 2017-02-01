import ActionTypes from 'lib/action-types';
import makeFetch from 'lib/utils/make-fetch';


export default function updateProfile(newProps) {

  return (dispatch, getState) => {

    const state = getState();

    // if we're already fetching, don't fire another fetch
    if(state.user.isBusy === true) {
      return Promise.resolve();
    }

    const fetchOpts = {
      url           : '/api/v2/profile',
      token         : state.user.data.accessToken,
      httpMethod    : 'PATCH',
      body          : newProps,
      requestAction : updateProfileRequest,
      successAction : updateProfileSuccess,
      errorAction   : updateProfileError
    };

    return makeFetch(fetchOpts, dispatch);

  }

}





function updateProfileRequest(requested) {
  return  {
    type : ActionTypes.UPDATE_PROFILE_REQUEST,
    requested
  }
}

function updateProfileSuccess(data, retrieved) {
  return  {
            type      : ActionTypes.UPDATE_PROFILE_SUCCESS,
            data,
            retrieved
          };
}

function updateProfileError(code, message, retrieved) {
  return  {
            type      : ActionTypes.UPDATE_PROFILE_ERROR,
            error     : { code, message },
            retrieved
          };
}

