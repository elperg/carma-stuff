import ActionTypes from 'lib/action-types';
import makeFetch from 'lib/utils/make-fetch';
import _ from 'lodash';


export default function fetchFilterOptions(projectUid) {

  return (dispatch, getState) => {

    const state = getState();

    if(state.filterOptions.isBusy === true) {
      return Promise.resolve();
    }

    // check to see if we have a project selected; if we do, request that, otherwise request the public version
    const url = '/api/v2/projects/'+projectUid+'/filters;

    const fetchOpts = {
      url           : url,
      token         : state.user.data.accessToken,
      requestAction : fetchFilterOptionsRequest,
      successAction : fetchFilterOptionsSuccess,
      errorAction   : fetchFilterOptionsError
    };

    return makeFetch(fetchOpts, dispatch);

  }

}



function fetchFilterOptionsRequest(requested) {
  return  {
    type : ActionTypes.FETCH_FILTER_OPTIONS_REQUEST,
    requested
  }
}

function fetchFilterOptionsSuccess(data, retrieved) {
  return  {
            type      : ActionTypes.FETCH_FILTER_OPTIONS_SUCCESS,
            data,
            retrieved
          };
}

function fetchFilterOptionsError(code, message, retrieved) {
  return  {
            type      : ActionTypes.FETCH_FILTER_OPTIONS_ERROR,
            error     : { code, message },
            retrieved
          };
}
