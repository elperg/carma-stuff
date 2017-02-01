import ActionTypes from 'lib/action-types';
import makeFetch from 'lib/utils/make-fetch';

export default function fetchTags(projectUi, filterValues) {

  return (dispatch, getState) => {

    const state = getState();

    // if we're already fetching, don't fire another fetch
    if(state.charts.tags.isBusy === true) {
      return Promise.resolve();
    }

    // compose the URL from all of the search filters
    const searchURL = composeSearchURL(filterValues, projectUid);

    const fetchOpts = {
      url           : searchURL,
      token         : state.user.data.accessToken,
      requestAction : fetchTagsRequest,
      successAction : fetchTagsSuccess,
      errorAction   : fetchTagsError
    };


    return makeFetch(fetchOpts, dispatch);

  }

}


function composeSearchURL(filters, projectUid) {

  const baseUrl = '/api/v2/projects/'+projectUid+'/analytics/charts/tags';

  return baseUrl;

}





function fetchTagsRequest(requested) {
  return  {
            type : ActionTypes.FETCH_TAGS_CHART_REQUEST,
            requested
          };
}

function fetchTagsSuccess(data, retrieved) {
  return  {
            type      : ActionTypes.FETCH_TAGS_CHART_SUCCESS,
            data,
            retrieved
          };
}

function fetchTagsError(code, message, retrieved) {
  return  {
            type      : ActionTypes.FETCH_TAGS_CHART_ERROR,
            code,
            message,
            retrieved
          };
}

