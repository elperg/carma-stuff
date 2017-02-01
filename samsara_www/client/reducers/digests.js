import ActionTypes from 'lib/action-types';
import InitialStates from 'lib/initial-states';

export default function(state = InitialStates.digests, action) {

  switch(action.type) {

    case ActionTypes.FETCH_DIGESTS_REQUEST:
      return Object.assign({}, state, {
          isBusy    : true,
          errors    : null,
          requested : action.requested,
          retrieved : null,
          data      : []
        });

    case ActionTypes.FETCH_DIGESTS_SUCCESS:
      return Object.assign({}, state, {
          isBusy    : false,
          errors    : null,
          retrieved : action.retrieved,
          data      : action.data
        });

    case ActionTypes.FETCH_DIGESTS_ERROR:
      return Object.assign({}, state, {
          isBusy    : false,
          errors    : action.errors,
          retrieved : action.retrieved,
          data      : []
        });

    default:
      return state;
  }

}
