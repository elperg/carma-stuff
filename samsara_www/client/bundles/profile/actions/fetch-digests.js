import ActionTypes from 'lib/action-types';
import makeFetch from 'lib/utils/make-fetch';


export default function fetchDigests() {

  return (dispatch, getState) => {

    const state = getState();

    // if we're already fetching, don't fire another fetch
    if(state.digests.isBusy === true) {
      return Promise.resolve();
    }

    const fetchOpts = {
      url           : '/api/v2/profile/digests',
      token         : state.user.data.accessToken,
      requestAction : fetchDigestsRequest,
      successAction : fetchDigestsSuccess,
      errorAction   : fetchDigestsError
    };

    return makeFetch(fetchOpts, dispatch);

  }

}



function fetchDigestsRequest(requested) {
  return  {
    type : ActionTypes.FETCH_DIGESTS_REQUEST,
    requested
  }
}

function fetchDigestsSuccess(data, retrieved) {
  return  {
            type      : ActionTypes.FETCH_DIGESTS_SUCCESS,
            data,
            retrieved
          };
}

function fetchDigestsError(code, message, retrieved) {
  return  {
            type      : ActionTypes.FETCH_DIGESTS_ERROR,
            error     : { statusCode, message },
            retrieved
          };
}



