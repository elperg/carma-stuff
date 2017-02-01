import ActionTypes from 'lib/action-types';
import makeFetch from 'lib/utils/make-fetch';

export default function fetchSentiment(projectUid, filterValues) {

  return (dispatch, getState) => {

    const state = getState();

    // if we're already fetching, don't fire another fetch
    if(state.charts.sentiment.isBusy === true) {
      return Promise.resolve();
    }

    // compose the URL from all of the search filters
    const searchURL = composeSearchURL(filterValues, projectUid);

    const fetchOpts = {
      url           : searchURL,
      token         : state.user.data.accessToken,
      requestAction : fetchSentimentRequest,
      successAction : fetchSentimentSuccess,
      errorAction   : fetchSentimentError
    };


    return makeFetch(fetchOpts, dispatch);

  }

}


function composeSearchURL(filters, projectUid) {

  const baseUrl = '/api/v2/projects/'+projectUid+'/analytics/charts/sentiment';

  return baseUrl;

}





function fetchSentimentRequest(requested) {
  return  {
            type : ActionTypes.FETCH_SENTIMENT_CHART_REQUEST,
            requested
          };
}

function fetchSentimentSuccess(data, retrieved) {
  return  {
            type      : ActionTypes.FETCH_SENTIMENT_CHART_SUCCESS,
            data,
            retrieved
          };
}

function fetchSentimentError(code, message, retrieved) {
  return  {
            type      : ActionTypes.FETCH_SENTIMENT_CHART_ERROR,
            code,
            message,
            retrieved
          };
}

