import ActionTypes from 'lib/action-types';

export function paginationFirstPage() {
  return  { type    : ActionTypes.PAGINATION_FIRST_PAGE };
}

export function paginationPreviousPage() {
  return  { type    : ActionTypes.PAGINATION_PREVIOUS_PAGE };
}

export function paginationNextPage() {
  return  { type    : ActionTypes.PAGINATION_NEXT_PAGE };
}

export function paginationLastPage() {
  return  { type    : ActionTypes.PAGINATION_LAST_PAGE };
}

export function paginationChangePageSize(pageSize) {
  return  {
            type    : ActionTypes.PAGINATION_CHANGE_PAGE_SIZE,
            pageSize
          };
}
