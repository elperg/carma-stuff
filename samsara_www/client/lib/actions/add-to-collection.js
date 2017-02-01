import ActionTypes from '../action-types';
import makeFetch from 'lib/utils/make-fetch';


export function addSelectedArticlesToExistingCollection(collectionId, articles, projectUid) {

  return (dispatch, getState) => {

    const state = getState();
    const project = _.find(state.projects.data, { uid: projectUid });
    const collection = _.find(project.collections, { id: collectionId });

    if(collection.articles !== undefined && collection.articles.isBusy === true) {
      return Promise.resolve();
    }

    const fetchOpts = {
      url           : '/api/v2/projects/' + projectUid + '/collections/add?target_collection_id=' + collectionId,
      token         : state.user.data.accessToken,
      method        : 'POST',
      body          : {'article_id': _.map(articles, 'id')},
      requestAction : (requested) => { return addToCollectionRequest(projectUid, collectionId, requested); },
      successAction : (data, retrieved) => { return addToCollectionSuccess(projectUid, collectionId, data, retrieved); },
      errorAction   : (code, message, retrieved) => { return addToCollectionError(projectUid, collectionId, code, message, retrieved); }
    };

    return makeFetch(fetchOpts, dispatch);

  }

}


export function addSelectedArticlesToNewCollection(props, articles, projectUid) {

  return (dispatch, getState) => {

    const state = getState();

    const project = _.find(state.projects.data, { uid: projectUid });

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
      successAction : (data, retrieved) => {

                        // need to return a thunk for dispatch
                        return (dispatch, getState) => {

                          // first, dispatch the create collection success
                          dispatch(createCollectionSuccess(projectUid, data, retrieved));

                          // Now, we're going to add the articles to the existing collection
                          dispatch(addSelectedArticlesToExistingCollection(data.id, articles, projectUid));

                        };

                      },
      errorAction   : (code, message, retrieved) => { return createCollectionError(projectUid, code, message, retrieved); }
    };

    return makeFetch(fetchOpts, dispatch);

  }

}




////////////////////////////
// ASYNC SUPPORT CREATORS //
////////////////////////////

// only referenced locally for async methods; could export in basic creators somewhere else
// to be loaded into a separate async actions file


function addToCollectionRequest(projectUid, collectionId, requested) {
  return  {
    type : ActionTypes.ADD_TO_COLLECTION_REQUEST,
    context : { projectUid, collectionId },
    requested
  };
}

function addToCollectionSuccess(projectUid, collectionId, data, retrieved) {
  return  {
            type      : ActionTypes.ADD_TO_COLLECTION_SUCCESS,
            context   : { projectUid, collectionId },
            data,
            retrieved
          };
}

function addToCollectionError(projectUid, collectionId, code, message, retrieved) {
  return  {
            type      : ActionTypes.ADD_TO_COLLECTION_ERROR,
            context   : { projectUid, collectionId },
            error     : { code, message },
            retrieved
          };
}








function createCollectionRequest(projectUid, requested) {
  return  {
    type : ActionTypes.CREATE_COLLECTION_REQUEST,
    context : { projectUid },
    requested
  };
}

function createCollectionSuccess(projectUid, data, retrieved) {
  return  {
            type      : ActionTypes.CREATE_COLLECTION_SUCCESS,
            context   : { projectUid },
            data,
            retrieved
          };
}

function createCollectionError(projectUid, code, message, retrieved) {
  return  {
            type      : ActionTypes.CREATE_COLLECTION_ERROR,
            context   : { projectUid },
            error     : { code, message },
            retrieved
          };
}

