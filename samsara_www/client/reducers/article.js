import ActionTypes from 'lib/action-types';
import InitialStates from 'lib/initial-states';


export default function(state = InitialStates.article, action) {

  switch(action.type) {

    case ActionTypes.FIND_ARTICLE_REQUEST:
      return Object.assign({}, state, {
        isBusy    : true,
        errors    : null,
        requested : action.requested,
        retrieved : null,
        data      : {}
      });

    case ActionTypes.FIND_ARTICLE_SUCCESS:
      return Object.assign({}, state, {
        isBusy      : false,
        errors      : null,
        data        : action.data
      });

    case ActionTypes.FIND_ARTICLE_ERROR:
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



