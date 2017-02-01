import ActionTypes from 'lib/action-types';
import InitialStates from 'lib/initial-states';


export default function(state = InitialStates.organizationsIndex, action) {

  switch(action.type) {

    case ActionTypes.FETCH_ORGANIZATIONS_REQUEST:
      return Object.assign({}, state, {
        isBusy    : true,
        errors    : null,
        requested : action.requested,
        retrieved : null,
        data      : []
      });

    case ActionTypes.FETCH_ORGANIZATIONS_SUCCESS:
      return Object.assign({}, state, {
        isBusy      : false,
        errors      : null,
        data        : action.data.organizations
      });

    case ActionTypes.FETCH_ORGANIZATIONS_ERROR:
      return Object.assign({}, state, {
        isBusy    : false,
        errors    : action.errors,
        retrieved : action.retrieved,
        data      : null
      });

    default:
      return state;
  }

}
