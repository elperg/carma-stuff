import ActionTypes from 'lib/action-types';
import makeFetch from 'lib/utils/make-fetch';




export default function updateCollection(props, collectionId, projectUid) {

  return (dispatch, getState) => {

    const state = getState();

    // get collection state
    const selectedProject = _.find(state.projects.data, { uid: projectUid });
    const selectedCollection = _.find(selectedProject.collections, { id: collectionId });

    // if we're already fetching, don't fire another fetch
    if(state.projects.isBusy === true) {
      return Promise.resolve();
    }

    const fetchOpts = {
      url           : '/api/v2/projects/'+projectUid+'/collections/'+collectionId,
      token         : state.user.data.accessToken,
      httpMethod    : 'PATCH',
      body          : {collection: props},
      requestAction : (requested) => { return updateCollectionRequest(projectUid, collectionId, requested); },
      successAction : (data, retrieved) => { return updateCollectionSuccess(projectUid, collectionId, data, retrieved); },
      errorAction   : (code, message, retrieved) => { return updateCollectionError(projectUid, collectionId, code, message, retrieved); }
    };

    return makeFetch(fetchOpts, dispatch);

  }

}



function updateCollectionRequest(projectUid, collectionId, requested) {
  return  {
            type : ActionTypes.UPDATE_COLLECTION_REQUEST,
            context: { projectUid, collectionId },
            requested
          };
}

function updateCollectionSuccess(projectUid, collectionId, data, retrieved) {
  return  {
            type      : ActionTypes.UPDATE_COLLECTION_SUCCESS,
            data,
            context   : { projectUid, collectionId },
            retrieved
          };
}

function updateCollectionError(projectUid, collectionId, code, message, retrieved) {
  return  {
            type      : ActionTypes.UPDATE_COLLECTION_ERROR,
            code,
            message,
            context   : { projectUid, collectionId },
            retrieved
          };
}
