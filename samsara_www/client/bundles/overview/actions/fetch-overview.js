import ActionTypes from 'lib/action-types';
import makeFetch from 'lib/utils/make-fetch';


export default function fetchOverview(projectUid) {

  return (dispatch, getState) => {

    const state = getState();

    // if we're already fetching, don't fire another fetch
    if(state.overview.isBusy === true) {
      return Promise.resolve();
    }

    const fetchOpts = {
      url           : '/api/v2/projects/'+projectUid+'/overview',
      token         : state.user.data.accessToken,
      requestAction : fetchOverviewRequest,
      successAction : fetchOverviewSuccess,
      errorAction   : fetchOverviewError
    };

    return makeFetch(fetchOpts, dispatch);

  }

}




function fetchOverviewRequest(requested) {
  return  {
    type : ActionTypes.FETCH_OVERVIEW_REQUEST,
    requested
  };
}

function fetchOverviewSuccess(data, retrieved) {
  return  {
    type : ActionTypes.FETCH_OVERVIEW_SUCCESS,
    data,
    retrieved
  };
}

function fetchOverviewError(code, message, retrieved) {
  return  {
    type : ActionTypes.FETCH_OVERVIEW_ERROR,
    retrieved,
    errors: [{ code, message }]
  };
}
