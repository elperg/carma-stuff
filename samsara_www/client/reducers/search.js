import ActionTypes from 'lib/action-types';
import InitialStates from 'lib/initial-states';


export default function(state = InitialStates.search, action) {

  switch(action.type) {

    case ActionTypes.SEARCH_ARTICLES_REQUEST:
      return Object.assign({}, state, {
        isBusy    : true,
        errors    : null,
        requested : action.requested,
        retrieved : null,
        data      : []
      });

    case ActionTypes.SEARCH_ARTICLES_SUCCESS:
      return Object.assign({}, state, {
        isBusy      : false,
        errors      : null,
        data        : action.data.articles,
        totalCount  : action.data.pagination.totalCount
      });

    case ActionTypes.SEARCH_ARTICLES_ERROR:
      return Object.assign({}, state, {
        isBusy    : false,
        errors    : action.errors,
        retrieved : action.retrieved,
        data      : null,
        totalCount: 0
      });

    default:
      return state;

  }

}

