import ActionTypes from 'lib/action-types';
import makeFetch from 'lib/utils/make-fetch';
import _ from 'lodash';


export default function fetchProjects(organizationUid) {

  return (dispatch, getState) => {

    const state = getState();

    // if we're already fetching, don't fire another fetch
    if(state.projects.isBusy === true) {
      return Promise.resolve();
    }


    const fetchOpts = {
      url           : `/api/v2/organizations/${organizationUid}/projects`,
      token         : state.user.data.accessToken,
      requestAction : fetchProjectsRequest,
      successAction : fetchProjectsSuccess,
      errorAction   : fetchProjectsError
    };

    return makeFetch(fetchOpts, dispatch);

  }

}






// only referenced locally for async methods; could export in basic creators somewhere else
// to be loaded into a separate async actions file
function fetchProjectsRequest(requested) {
  return  {
            type : ActionTypes.FETCH_PROJECTS_REQUEST,
            requested
          };
}

function fetchProjectsSuccess(data, retrieved) {
  return  {
            type      : ActionTypes.FETCH_PROJECTS_SUCCESS,
            data,
            retrieved
          };
}

function fetchProjectsError(code, message, retrieved) {
  return  {
            type      : ActionTypes.FETCH_PROJECTS_ERROR,
            error     : { code, message },
            retrieved
          };
}
