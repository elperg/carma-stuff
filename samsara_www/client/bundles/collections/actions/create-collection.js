import ActionTypes from 'lib/action-types';
import makeFetch from 'lib/utils/make-fetch';

export default function createCollection(props, projectUid) {

  return (dispatch, getState) => {

    const state = getState();

    // if we're already fetching, don't fire another fetch
    if(state.projects.isBusy === true) {
      return Promise.resolve();
    }

    const fetchOpts = {
      url           : '/api/v2/projects/'+projectUid+'/collections',
      token         : state.user.data.accessToken,
      httpMethod    : 'POST',
      body          : props,
      requestAction : (requested) => { return createCollectionRequest(projectUid, requested); },
      successAction : (data, retrieved) => { return createCollectionSuccess(projectUid, data, retrieved); },
      errorAction   : (code, message, retrieved) => { return createCollectionError(projectUid, code, message, retrieved); }
    };

    return makeFetch(fetchOpts, dispatch);

  }

}



function createCollectionRequest(projectUid, requested) {
  return  {
            type : ActionTypes.CREATE_COLLECTION_REQUEST,
            context: { projectUid },
            requested
          };
}

function createCollectionSuccess(projectUid, data, retrieved) {
  return  {
            type      : ActionTypes.CREATE_COLLECTION_SUCCESS,
            data,
            context   : { projectUid },
            retrieved
          };
}

function createCollectionError(projectUid, code, message, retrieved) {
  return  {
            type      : ActionTypes.CREATE_COLLECTION_ERROR,
            code,
            message,
            context   : { projectUid },
            retrieved
          };
}

