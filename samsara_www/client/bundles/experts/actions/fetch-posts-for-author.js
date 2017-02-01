import ActionTypes from 'lib/action-types';
import makeFetch from 'lib/utils/make-fetch';


export default function fetchPostsForAuthor(authorId) {

  return (dispatch, getState) => {

    const state = getState();

    // if we're already fetching, don't fire another fetch
    if(state.search.isBusy === true) {
      return Promise.resolve();
    }


    const fetchOpts = {
      url           : '/api/v2/experts/posts/' + authorId,
      token         : state.user.data.accessToken,
      requestAction : fetchPostsForAuthorRequest,
      successAction : fetchPostsForAuthorSuccess,
      errorAction   : fetchPostsForAuthorError
    };


    return makeFetch(fetchOpts, dispatch);

  }

}



function fetchPostsForAuthorRequest(requested) {
  return  {
            type : ActionTypes.FETCH_POSTS_FOR_AUTHOR_REQUEST,
            requested
          };
}

function fetchPostsForAuthorSuccess(data, retrieved) {
  return  {
            type      : ActionTypes.FETCH_POSTS_FOR_AUTHOR_SUCCESS,
            data,
            retrieved
          };
}

function fetchPostsForAuthorError(code, message, retrieved) {
  return  {
            type      : ActionTypes.FETCH_POSTS_FOR_AUTHOR_ERROR,
            code,
            message,
            retrieved
          };
}

