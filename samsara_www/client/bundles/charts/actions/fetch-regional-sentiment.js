import ActionTypes from 'lib/action-types';
import makeFetch from 'lib/utils/make-fetch';

export default function fetchRegionalSentiment(projectUid, filterValues) {

  return (dispatch, getState) => {

    const state = getState();

    // if we're already fetching, don't fire another fetch
    if(state.charts.regionalSentiment.isBusy === true) {
      return Promise.resolve();
    }

    // compose the URL from all of the search filters
    const searchURL = composeSearchURL(projectUid, projectUid);

    const fetchOpts = {
      url           : searchURL,
      token         : state.user.data.accessToken,
      requestAction : fetchRegionalSentimentRequest,
      successAction : fetchRegionalSentimentSuccess,
      errorAction   : fetchRegionalSentimentError
    };


    return makeFetch(fetchOpts, dispatch);

  }

}


function composeSearchURL(filters, projectUid) {

  const baseUrl = '/api/v2/projects/'+projectUid+'/analytics/charts/regional_sentiment';

  return baseUrl;

}




function fetchRegionalSentimentRequest(requested) {
  return  {
            type : ActionTypes.FETCH_REGIONAL_SENTIMENT_CHART_REQUEST,
            requested
          };
}

function fetchRegionalSentimentSuccess(data, retrieved) {
  return  {
            type      : ActionTypes.FETCH_REGIONAL_SENTIMENT_CHART_SUCCESS,
            data,
            retrieved
          };
}

function fetchRegionalSentimentError(code, message, retrieved) {
  return  {
            type      : ActionTypes.FETCH_REGIONAL_SENTIMENT_CHART_ERROR,
            code,
            message,
            retrieved
          };
}

