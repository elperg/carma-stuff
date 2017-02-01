import ActionTypes from 'lib/action-types';
import makeFetch from 'lib/utils/make-fetch';
import { browserHistory } from 'react-router'

import logout from '../../bundles/login/actions/logout';

import _ from 'lodash';



export default function fetchUserInfo() {

  return (dispatch, getState) => {

    const state = getState();

    // if we're already fetching, don't fire another fetch
    if(state.user.isBusy === true) {
      return Promise.resolve();
    }

    const { id, accessToken } = state.user.data;

    const fetchOpts = {
      url           : '/api/v2/userinfo?id='+id,
      token         : accessToken,
      httpMethod    : 'GET',
      requestAction : fetchUserInfoRequest,
      successAction : fetchUserInfoSuccess,
      errorAction   : fetchUserInfoError
    };

    return makeFetch(fetchOpts, dispatch);

  }

}





function fetchUserInfoRequest(requested) {
  return  {
            type : ActionTypes.FETCH_USERINFO_REQUEST,
            requested
          };
}

function fetchUserInfoSuccess(data, retrieved) {

  // once we get a state for user where we have data, redirect to articles
  return  {
            type      : ActionTypes.FETCH_USERINFO_SUCCESS,
            data      : data,
            retrieved
          };
}

function fetchUserInfoError(code, message, retrieved) {

  // If we've received a 401, we're going to have to login again
  if(code === 401) {
    logout();
    return ;
  }

  return  {
            type      : ActionTypes.FETCH_USERINFO_ERROR,
            error     : { code, message },
            retrieved
          };
}
