import ActionTypes from 'lib/action-types';
import makeFetch from 'lib/utils/make-fetch';


export default function fetchArticlesForCollection(collectionId, projectUid) {

  return (dispatch, getState) => {

    const state = getState();

    const project = _.find(state.projects.data, { uid: projectUid });
    const collection = _.find(project.collections, { id: collectionId });

    // if we're already fetching, don't fire another fetch
    if(collection.articles !== undefined && collection.articles.isBusy === true) {
      return Promise.resolve();
    }

    const fetchOpts = {
      url           : '/api/v2/projects/'+projectUid+'/collections/'+collection.id+'/search',
      token         : state.user.data.accessToken,
      requestAction : (requested) => { return fetchArticlesForCollectionRequest(projectUid, collectionId, requested); },
      successAction : (data, retrieved) => { return fetchArticlesForCollectionSuccess(projectUid, collectionId, data, retrieved); },
      errorAction   : (code, message, retrieved) => { return fetchArticlesForCollectionError(projectUid, collectionId, code, message, retrieved); }
    };

    return makeFetch(fetchOpts, dispatch);
  }

}


// only referenced locally for async methods; could export in basic creators somewhere else
// to be loaded into a separate async actions file
function fetchArticlesForCollectionRequest(projectUid, collectionId, requested) {
  return  {
    type : ActionTypes.FETCH_COLLECTION_ARTICLES_REQUEST,
    context : { projectUid, collectionId },
    requested
  }
}

function fetchArticlesForCollectionSuccess(projectUid, collectionId, data, retrieved) {

  return  {
            type      : ActionTypes.FETCH_COLLECTION_ARTICLES_SUCCESS,
            context   : { projectUid, collectionId },
            data,
            retrieved
          };
}

function fetchArticlesForCollectionError(projectUid, collectionId, code, message, retrieved) {
  return  {
            type      : ActionTypes.FETCH_COLLECTION_ARTICLES_ERROR,
            context   : { projectUid, collectionId },
            error     : { code, message },
            retrieved
          };
}
