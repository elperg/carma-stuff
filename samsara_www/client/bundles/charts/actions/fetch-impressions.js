import ActionTypes from 'lib/action-types';
import makeFetch from 'lib/utils/make-fetch';

export default function fetchImpressions(projectUid, filterValues) {

  return (dispatch, getState) => {

    const state = getState();

    // if we're already fetching, don't fire another fetch
    if(state.charts.impressions.isBusy === true) {
      return Promise.resolve();
    }

    // compose the URL from all of the search filters
    const searchURL = composeSearchURL(filterValues, projectUid);

    const fetchOpts = {
      url           : searchURL,
      token         : state.user.data.accessToken,
      requestAction : fetchImpressionsRequest,
      successAction : fetchImpressionsSuccess,
      errorAction   : fetchImpressionsError
    };


    return makeFetch(fetchOpts, dispatch);

  }

}


function composeSearchURL(filters, projectUid) {

  const baseUrl = '/api/v2/projects/'+projectUid+'/analytics/charts/impressions';

  return baseUrl;

}




function fetchImpressionsRequest(requested) {
  return  {
            type : ActionTypes.FETCH_IMPRESSIONS_CHART_REQUEST,
            requested
          };
}

function fetchImpressionsSuccess(data, retrieved) {
  return  {
            type      : ActionTypes.FETCH_IMPRESSIONS_CHART_SUCCESS,
            data,
            retrieved
          };
}

function fetchImpressionsError(code, message, retrieved) {
  return  {
            type      : ActionTypes.FETCH_IMPRESSIONS_CHART_ERROR,
            code,
            message,
            retrieved
          };
}

