import ActionTypes from 'lib/action-types';
import makeFetch from 'lib/utils/make-fetch';

export default function fetchAVE(projectUid, filterValues) {

  return (dispatch, getState) => {

    const state = getState();

    // if we're already fetching, don't fire another fetch
    if(state.charts.ave.isBusy === true) {
      return Promise.resolve();
    }

    // compose the URL from all of the search filters
    const searchURL = composeSearchURL(filterValues, projectUid);

    const fetchOpts = {
      url           : searchURL,
      token         : state.user.data.accessToken,
      requestAction : fetchAVERequest,
      successAction : fetchAVESuccess,
      errorAction   : fetchAVEError
    };


    return makeFetch(fetchOpts, dispatch);

  }

}


function composeSearchURL(filters, projectUid) {

  const baseUrl = '/api/v2/projects/'+projectUid+'/analytics/charts/ave';

  return baseUrl;

}




function fetchAVERequest(requested) {
  return  {
            type : ActionTypes.FETCH_AVE_CHART_REQUEST,
            requested
          };
}

function fetchAVESuccess(data, retrieved) {
  return  {
            type      : ActionTypes.FETCH_AVE_CHART_SUCCESS,
            data,
            retrieved
          };
}

function fetchAVEError(code, message, retrieved) {
  return  {
            type      : ActionTypes.FETCH_AVE_CHART_ERROR,
            code,
            message,
            retrieved
          };
}

