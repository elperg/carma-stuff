import ActionTypes from 'lib/action-types';
import makeFetch from 'lib/utils/make-fetch';

export default function fetchOutlets(projectUid, filterValues) {

  return (dispatch, getState) => {

    const state = getState();

    // if we're already fetching, don't fire another fetch
    if(state.charts.outlets.isBusy === true) {
      return Promise.resolve();
    }

    // compose the URL from all of the search filters
    const searchURL = composeSearchURL(filterValues, projectUid);

    const fetchOpts = {
      url           : searchURL,
      token         : state.user.data.accessToken,
      requestAction : fetchOutletsRequest,
      successAction : fetchOutletsSuccess,
      errorAction   : fetchOutletsError
    };


    return makeFetch(fetchOpts, dispatch);

  }

}


function composeSearchURL(filters, projectUid) {

  const baseUrl = '/api/v2/projects/'+projectUid+'/analytics/charts/outlets';

  return baseUrl;

}



function fetchOutletsRequest(requested) {
  return  {
            type : ActionTypes.FETCH_OUTLETS_CHART_REQUEST,
            requested
          };
}

function fetchOutletsSuccess(data, retrieved) {
  return  {
            type      : ActionTypes.FETCH_OUTLETS_CHART_SUCCESS,
            data,
            retrieved
          };
}

function fetchOutletsError(code, message, retrieved) {
  return  {
            type      : ActionTypes.FETCH_OUTLETS_CHART_ERROR,
            code,
            message,
            retrieved
          };
}

