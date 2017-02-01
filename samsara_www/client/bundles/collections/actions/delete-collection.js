import ActionTypes from 'lib/action-types';
import makeFetch from 'lib/utils/make-fetch';


export default function deleteCollection(collectionId, projectUid) {

  return (dispatch, getState) => {

    const state = getState();

    // if we're already fetching, don't fire another fetch
    if(state.projects.isBusy === true) {
      return Promise.resolve();
    }



    const fetchOpts = {
      url           : '/api/v2/projects/'+projectUid+'/collections/'+collectionId,
      token         : state.user.data.accessToken,
      httpMethod    : 'DELETE',
      requestAction : (requested) => { return deleteCollectionRequest(projectUid, collectionId, requested); },
      successAction : (data, retrieved) => { return deleteCollectionSuccess(projectUid, collectionId, data, retrieved); },
      errorAction   : (code, message, retrieved) => { return deleteCollectionError(projectUid, collectionId, code, message, retrieved); }
    };

    return makeFetch(fetchOpts, dispatch);

  }

}


function deleteCollectionRequest(projectUid, collectionId, requested) {
  return  {
    type : ActionTypes.DELETE_COLLECTION_REQUEST,
    context: { projectUid, collectionId },
    requested
  }
}

function deleteCollectionSuccess(projectUid, collectionId, data, retrieved) {
  return  {
            type      : ActionTypes.DELETE_COLLECTION_SUCCESS,
            data,
            context   : { projectUid, collectionId },
            retrieved
          };
}

function deleteCollectionError(projectUid, collectionId, code, message, retrieved) {
  return  {
            type      : ActionTypes.UPDATE_COLLECTION_ERROR,
            code,
            message,
            context   : { projectUid, collectionId },
            retrieved
          };
}



