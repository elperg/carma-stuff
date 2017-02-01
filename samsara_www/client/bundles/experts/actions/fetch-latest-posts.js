import ActionTypes from 'lib/action-types';
import makeFetch from 'lib/utils/make-fetch';


export default function fetchLatestPosts(projectUid) {

  return (dispatch, getState) => {

    const state = getState();


    // if we're already fetching, don't fire another fetch
    if(state.experts.isBusy === true) {
      return Promise.resolve();
    }


    const fetchOpts = {
      url           : '/api/v2/projects/'+projectUid+'/experts',
      token         : state.user.data.accessToken,
      requestAction : fetchLatestPostsRequest,
      successAction : fetchLatestPostsSuccess,
      errorAction   : fetchLatestPostsError
    };


    return makeFetch(fetchOpts, dispatch);

  }

}


function fetchLatestPostsRequest(requested) {
  return  {
            type : ActionTypes.FETCH_EXPERTS_REQUEST,
            requested
          };
}

function fetchLatestPostsSuccess(data, retrieved) {
  return  {
            type      : ActionTypes.FETCH_EXPERTS_SUCCESS,
            data,
            retrieved
          };
}

function fetchLatestPostsError(code, message, retrieved) {
  return  {
            type      : ActionTypes.FETCH_EXPERTS_ERROR,
            retrieved,
            errors: [{ code, message }]
          };
}
