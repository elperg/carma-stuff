import ActionTypes from 'lib/action-types';
import makeFetch from 'lib/utils/make-fetch';

export default function fetchRegionalEngagement(projectUid, filterValues) {

  return (dispatch, getState) => {

    const state = getState();

    // if we're already fetching, don't fire another fetch
    if(state.charts.regionalEngagement.isBusy === true) {
      return Promise.resolve();
    }

    // compose the URL from all of the search filters
    const searchURL = composeSearchURL(filterValues, projectUid);

    const fetchOpts = {
      url           : searchURL,
      token         : state.user.data.accessToken,
      requestAction : fetchRegionalEngagementRequest,
      successAction : fetchRegionalEngagementSuccess,
      errorAction   : fetchRegionalEngagementError
    };


    return makeFetch(fetchOpts, dispatch);

  }

}


function composeSearchURL(filters, projectUid) {

  const baseUrl = '/api/v2/projects/'+projectUid+'/analytics/charts/regional_engagement';

  return baseUrl;

}



function fetchRegionalEngagementRequest(requested) {
  return  {
            type : ActionTypes.FETCH_REGIONAL_ENGAGEMENT_CHART_REQUEST,
            requested
          };
}

function fetchRegionalEngagementSuccess(data, retrieved) {
  return  {
            type      : ActionTypes.FETCH_REGIONAL_ENGAGEMENT_CHART_SUCCESS,
            data,
            retrieved
          };
}

function fetchRegionalEngagementError(code, message, retrieved) {
  return  {
            type      : ActionTypes.FETCH_REGIONAL_ENGAGEMENT_CHART_ERROR,
            code,
            message,
            retrieved
          };
}

