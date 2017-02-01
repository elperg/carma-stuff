import ActionTypes from 'lib/action-types';
import makeFetch from 'lib/utils/make-fetch';


export default function fetchAuthors() {

  return (dispatch, getState) => {

    const state = getState();

    // if we're already fetching, don't fire another fetch
    if(state.search.isBusy === true) {
      return Promise.resolve();
    }


    const fetchOpts = {
      url           : '/api/v2/experts/authors',
      token         : state.user.data.accessToken,
      requestAction : fetchAuthorsRequest,
      successAction : fetchAuthorsSuccess,
      errorAction   : fetchAuthorsError
    };


    return makeFetch(fetchOpts, dispatch);

  }

}



function fetchAuthorsRequest(requested) {
  return  {
            type : ActionTypes.FETCH_AUTHORS_REQUEST,
            requested
          };
}

function fetchAuthorsSuccess(data, retrieved) {
  return  {
            type      : ActionTypes.FETCH_AUTHORS_SUCCESS,
            data,
            retrieved
          };
}

function fetchAuthorsError(code, message, retrieved) {
  return  {
            type      : ActionTypes.FETCH_AUTHORS_ERROR,
            code,
            message,
            retrieved
          };
}

