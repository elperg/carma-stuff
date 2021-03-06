import ActionTypes from 'lib/action-types';
import InitialStates from 'lib/initial-states';


// Combined reducers for "projects"
export default function(state = InitialStates.organization, action) {

switch(action.type) {

    case ActionTypes.FETCH_USERINFO_REQUEST:
      return Object.assign({}, state, {
          isBusy    : true,
          errors    : null,
          requested : action.requested,
          retrieved : null
        });

    case ActionTypes.FETCH_USERINFO_SUCCESS:
      return Object.assign({}, state, {
          isBusy    : false,
          errors    : null,
          retrieved : action.retrieved,
          data      : action.data.organization
        });

    case ActionTypes.FETCH_USERINFO_ERROR:
      return Object.assign({}, state, {
          isBusy    : false,
          errors    : action.errors,
          retrieved : action.retrieved
        });

    default:
      return state;
  }

}

