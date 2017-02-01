import ActionTypes from 'lib/action-types';


export default function(state = [], action) {

  switch(action.type) {

    case ActionTypes.SELECT_ITEM:
      return [...state, action.id];

    case ActionTypes.DESELECT_ITEM:
      return _.without(state, action.id);

    case ActionTypes.SELECT_ALL:
      return action.items;

    case 'LOCATION_CHANGE':
    case ActionTypes.SEARCH_ARTICLES_REQUEST:
    case ActionTypes.FETCH_COLLECTION_ARTICLES_REQUEST:
    case ActionTypes.ADD_TO_COLLECTION_SUCCESS:
    case ActionTypes.DESELECT_ALL:
      return [];

    default:
      return state;

  }

}

