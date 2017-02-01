import ActionTypes from 'lib/action-types';
import makeFetch from 'lib/utils/make-fetch';


function removeFromCollectionRequest(requestedAt) {
  return  {
    type : ActionTypes.REMOVE_FROM_COLLECTION_REQUEST,
    requestedAt
  };
}

function removeFromCollectionSuccess(message, receivedAt) {
  return  {
            type      : ActionTypes.REMOVE_FROM_COLLECTION_SUCCESS,
            message,
            receivedAt
          };
}

function removeFromCollectionError(code, message, receivedAt) {
  return  {
            type      : ActionTypes.REMOVE_FROM_COLLECTION_ERROR,
            code,
            message,
            receivedAt
          };
}
