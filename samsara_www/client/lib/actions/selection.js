import ActionTypes from 'lib/action-types';

export function selectItem(id) {
  return  {
            type : ActionTypes.SELECT_ITEM,
            id
          };
}

export function deselectItem(id) {
  return  {
            type : ActionTypes.DESELECT_ITEM,
            id
          };
}

export function selectAll(items) {
  return  {
            type : ActionTypes.SELECT_ALL,
            items
          };
}

export function deselectAll() {
  return  { type : ActionTypes.DESELECT_ALL };
}


