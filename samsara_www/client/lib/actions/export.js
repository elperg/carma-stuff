import ActionTypes from '../action-types';

import fetch from 'isomorphic-fetch';

import { APIURLs } from '../app-constants';

///////////////////
// SYNC CREATORS //
///////////////////

export function exportSelectedArticles(format) {
  return  {
            type : ActionTypes.EXPORT_SELECTED_ARTICLES,
            format
          };
}

export function exportAllArticles(format) {
  return  {
            type : ActionTypes.EXPORT_ALL_ARTICLES,
            format
          };
}



////////////////////
// ASYNC CREATORS //
////////////////////

export function prepareExport(format) {

  return (dispatch, getState) => {

    // if we're already fetching, don't fire another fetch
    if(getState().connection.isPreparingExport === true) {
      return Promise.resolve();
    }


    // first dispatch, starting request
    dispatch(prepareExportRequest());

    // Per redux doc: The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method

    return  fetch(APIURLs[`export_${format}`])
              .then((response) => {

                if(response.status >= 400) {

                  // we've got an error!
                  dispatch(prepareExportError(response.status, response.json().message));

                } else {

                  // we've got data!
                  dispatch(prepareExportSuccess(response.json().url));

                }

              });
  }

}


////////////////////////////
// ASYNC SUPPORT CREATORS //
////////////////////////////



// only referenced locally for async methods; could export in basic creators somewhere else
// to be loaded into a separate async actions file
function prepareExportRequest() {
  return  { type : ActionTypes.PREPARE_EXPORT_REQUEST }
}

function prepareExportSuccess(url) {
  return  {
            type      : ActionTypes.PREPARE_EXPORT_SUCCESS,
            url,
            receivedAt: Date.now()
          };
}

function prepareExportError(statusCode, message) {
  return  {
            type      : ActionTypes.PREPARE_EXPORT_ERROR,
            error     : { statusCode, message },
            receivedAt: Date.now()
          };
}

