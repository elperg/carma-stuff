import ActionTypes from 'lib/action-types';
import makeFetch from 'lib/utils/make-fetch';
import _ from 'lodash';


export default function findArticleByUid(articleUid, projectUid) {

  return (dispatch, getState) => {

    const state = getState();

    // 1st, see if we already have the article in state.search.data
    const cachedArticleData = _.find(state.search.data, { uid: articleUid });

    // if we've found the article, dispatch the success action with data and state.search's retrieved property
    if(cachedArticleData !== undefined) {
      dispatch(findArticleSuccess(cachedArticleData, state.search.retrieved));
      return ;
    }


    // we haven't cached the article in search, so we'll need to pull it from the server
    // if we're already fetching, don't fire another fetch
    if(state.article.isBusy === true) {
      return Promise.resolve();
    }

    // check to see if we have a project selected; if we do, request that, otherwise request the public version
    let searchURL, token;
    if(projectUid !== undefined) {
      searchURL = '/api/v2/projects/'+projectUid+'/articles/'+articleUid;
      token = state.user.data.accessToken;
    } else {
      searchURL = '/a/'+articleUid;
      token = '';
    }

    const fetchOpts = {
      url           : searchURL,
      token         : token,
      requestAction : findArticleRequest,
      successAction : findArticleSuccess,
      errorAction   : findArticleError
    };

    return makeFetch(fetchOpts, dispatch);

  }

}



function findArticleRequest(requested) {
  return  {
    type : ActionTypes.FIND_ARTICLE_REQUEST,
    requested
  }
}

function findArticleSuccess(data, retrieved) {
  return  {
            type      : ActionTypes.FIND_ARTICLE_SUCCESS,
            data,
            retrieved
          };
}

function findArticleError(code, message, retrieved) {
  return  {
            type      : ActionTypes.FIND_ARTICLE_ERROR,
            error     : { code, message },
            retrieved
          };
}
