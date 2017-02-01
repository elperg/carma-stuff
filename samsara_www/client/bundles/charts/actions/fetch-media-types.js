import ActionTypes from 'lib/action-types';
import makeFetch from 'lib/utils/make-fetch';

export default function fetchMediaTypes(projectUid, filterValues) {

  return (dispatch, getState) => {

    const state = getState();

    // if we're already fetching, don't fire another fetch
    if(state.charts.mediaTypes.isBusy === true) {
      return Promise.resolve();
    }

    // compose the URL from all of the search filters
    const searchURL = composeSearchURL(filterValues, projectUid);

    const fetchOpts = {
      url           : searchURL,
      token         : state.user.data.accessToken,
      requestAction : fetchMediaTypesRequest,
      successAction : fetchMediaTypesSuccess,
      errorAction   : fetchMediaTypesError
    };


    return makeFetch(fetchOpts, dispatch);

  }

}



function composeSearchURL(filters, projectUid) {

  const baseUrl = '/api/v2/projects/'+projectUid+'/analytics/charts/media_types';

  return baseUrl;

}


function fetchMediaTypesRequest(requested) {
  return  {
            type : ActionTypes.FETCH_MEDIA_TYPES_CHART_REQUEST,
            requested
          };
}

function fetchMediaTypesSuccess(data, retrieved) {
  return  {
            type      : ActionTypes.FETCH_MEDIA_TYPES_CHART_SUCCESS,
            data,
            retrieved
          };
}

function fetchMediaTypesError(code, message, retrieved) {
  return  {
            type      : ActionTypes.FETCH_MEDIA_TYPES_CHART_ERROR,
            code,
            message,
            retrieved
          };
}

