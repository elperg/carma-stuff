import ActionTypes from 'lib/action-types';
import InitialStates from 'lib/initial-states';

export default function(state = InitialStates.overview, action) {

  switch(action.type) {

    case ActionTypes.FETCH_OVERVIEW_REQUEST:
      return Object.assign({}, state, {
          isBusy    : true,
          errors    : null,
          requested : action.requested,
          retrieved : null
        });

    case ActionTypes.FETCH_OVERVIEW_SUCCESS:
      return Object.assign({}, state, {
          isBusy    : false,
          errors    : null,
          retrieved : action.retrieved,
          data      : action.data
        });

    case ActionTypes.FETCH_OVERVIEW_ERROR:
      return Object.assign({}, state, {
          isBusy    : false,
          errors    : action.errors,
          retrieved : action.retrieved
        });
    default:
      return state;

  }

}

