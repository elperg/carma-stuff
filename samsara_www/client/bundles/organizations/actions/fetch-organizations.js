import ActionTypes from 'lib/action-types';
import makeFetch from 'lib/utils/make-fetch';
import _ from 'lodash';


export default function fetchOrganizations() {

  return (dispatch, getState) => {

    const state = getState();

    // if we're already fetching, don't fire another fetch
    if(state.organizationsIndex.isBusy === true) {
      return Promise.resolve();
    }


    const fetchOpts = {
      url           : '/api/v2/organizations',
      token         : state.user.data.accessToken,
      requestAction : fetchOrganizationsRequest,
      successAction : fetchOrganizationsSuccess,
      errorAction   : fetchOrganizationsError
    };

    return makeFetch(fetchOpts, dispatch);

  }

}






// only referenced locally for async methods; could export in basic creators somewhere else
// to be loaded into a separate async actions file
function fetchOrganizationsRequest(requested) {
  return  {
            type : ActionTypes.FETCH_ORGANIZATIONS_REQUEST,
            requested
          };
}

function fetchOrganizationsSuccess(data, retrieved) {
  return  {
            type      : ActionTypes.FETCH_ORGANIZATIONS_SUCCESS,
            data,
            retrieved
          };
}

function fetchOrganizationsError(code, message, retrieved) {
  return  {
            type      : ActionTypes.FETCH_ORGANIZATIONS_ERROR,
            error     : { code, message },
            retrieved
          };
}
