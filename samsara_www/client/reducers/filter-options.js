import ActionTypes from 'lib/action-types';
import InitialStates from 'lib/initial-states';


export default function(state = InitialStates.filterOptions, action) {

  switch(action.type) {

    case ActionTypes.FETCH_FILTER_OPTIONS_REQUEST:
      return Object.assign({}, state, {
        isBusy    : true,
        errors    : null,
        requested : action.requested,
        retrieved : null,
        data      : InitialStates.filterOptions.data
      });

    case ActionTypes.FETCH_FILTER_OPTIONS_SUCCESS:
      return Object.assign({}, state, {
        isBusy      : false,
        errors      : null,
        data        : action.data
      });

    case ActionTypes.FETCH_FILTER_OPTIONS_ERROR:
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
