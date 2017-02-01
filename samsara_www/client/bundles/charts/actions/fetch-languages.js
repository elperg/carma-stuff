import ActionTypes from 'lib/action-types';
import makeFetch from 'lib/utils/make-fetch';

export default function fetchLanguages(projectUid, filterValues) {

  return (dispatch, getState) => {

    const state = getState();

    // if we're already fetching, don't fire another fetch
    if(state.charts.languages.isBusy === true) {
      return Promise.resolve();
    }

    // compose the URL from all of the search filters
    const searchURL = composeSearchURL(filterValues, projectUid);

    const fetchOpts = {
      url           : searchURL,
      token         : state.user.data.accessToken,
      requestAction : fetchLanguagesRequest,
      successAction : fetchLanguagesSuccess,
      errorAction   : fetchLanguagesError
    };


    return makeFetch(fetchOpts, dispatch);

  }

}



function composeSearchURL(filters, projectUid) {

  const baseUrl = '/api/v2/projects/'+projectUid+'/analytics/charts/languages';

  return baseUrl;

}




function fetchLanguagesRequest(requested) {
  return  {
            type : ActionTypes.FETCH_LANGUAGES_CHART_REQUEST,
            requested
          };
}

function fetchLanguagesSuccess(data, retrieved) {
  return  {
            type      : ActionTypes.FETCH_LANGUAGES_CHART_SUCCESS,
            data,
            retrieved
          };
}

function fetchLanguagesError(code, message, retrieved) {
  return  {
            type      : ActionTypes.FETCH_LANGUAGES_CHART_ERROR,
            code,
            message,
            retrieved
          };
}

