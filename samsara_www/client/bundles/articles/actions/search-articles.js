import ActionTypes from 'lib/action-types';
import makeFetch from 'lib/utils/make-fetch';
import _ from 'lodash';
import moment from 'moment';


////////////////////
// ASYNC CREATORS //
////////////////////


export default function searchArticles(projectUid, filterValues) {

  return (dispatch, getState) => {

    const state = getState();

    // if we're already fetching, don't fire another fetch
    if(state.search.isBusy === true) {
      return Promise.resolve();
    }

    // compose the URL from all of the search filters
    const searchURL = composeSearchURL(filterValues, state.search.pagination, projectUid);

    const fetchOpts = {
      url           : searchURL,
      token         : state.user.data.accessToken,
      requestAction : searchArticlesRequest,
      successAction : searchArticlesSuccess,
      errorAction   : searchArticlesError
    };


    return makeFetch(fetchOpts, dispatch);

  }

}



/////////////////////////////
//  ARTICLES URL COMPOSER  //
/////////////////////////////

function composeSearchURL(filters, pagination, projectUid) {

  let queryArgs = [];


  // otherwise, hit the regular service, with project UID
  const url = '/api/v2/projects/'+projectUid+'/articles'


  // add filters to search query

  // 1. Query
  if(_.isString(filters.query) && _.isEmpty(filters.query) === false) {
    queryArgs.push(encodeURIComponent('article_filter[query]') + '=' + encodeURIComponent(filters.query.trim()));
  }

  // 2. Media Subtypes
  if(_.isArray(filters.mediaSubtype) === true && _.isEmpty(filters.mediaSubtype) === false) {
    _.each(filters.mediaSubtype, (subtype) => {
      queryArgs.push(encodeURIComponent('article_filter[media_subtypes][]') + '=' + encodeURIComponent(subtype));
    });
  }

  // 3. Sentiments
  if(_.isArray(filters.sentiment) === true && _.isEmpty(filters.sentiment) === false) {
    _.each(filters.sentiment, (sentiment) => {
      queryArgs.push(encodeURIComponent('article_filter[sentiments][]') + '=' + encodeURIComponent(sentiment));
    });
  }

  // 4. Location
  if(_.isArray(filters.location) === true && _.isEmpty(filters.location) === false) {
    _.each(filters.location, (location) => {
      queryArgs.push(encodeURIComponent('article_filter[location][]') + '=' + encodeURIComponent(location));
    });
  }

  // 5. Outlet
  if(_.isArray(filters.outlet) === true && _.isEmpty(filters.outlet) === false) {
    _.each(filters.outlet, (outlet) => {
      queryArgs.push(encodeURIComponent('article_filter[outlet][]') + '=' + encodeURIComponent(outlet));
    });
  }

  // 6a. Outlet Language
  if(_.isArray(filters.outletLanguage) === true && _.isEmpty(filters.outletLanguage) === false) {
    _.each(filters.outletLanguage, (outletLanguage) => {
      queryArgs.push(encodeURIComponent('article_filter[language][]') + '=' + encodeURIComponent(outletLanguage));
    });
  }

  // 6b. Primary Language
  if(_.isArray(filters.primaryLanguage) === true && _.isEmpty(filters.primaryLanguage) === false) {
    _.each(filters.primaryLanguage, (primaryLanguage) => {
      queryArgs.push(encodeURIComponent('article_filter[setting_language][]') + '=' + encodeURIComponent(primaryLanguage));
    });
  }

  // 7. Tag (state value (str) = "Competitors,Audi"; transform to be a string like like ["Competitors","Audi"])
  if(_.isArray(filters.tag) === true && _.isEmpty(filters.tag) === false) {
    _.each(filters.tag, (tag) => {
      const tagfilter = '[' + tag.split(',').map((s) => { return '"'+s+'"' }) + ']';
      queryArgs.push(encodeURIComponent('article_filter[tag][]') + '=' + encodeURIComponent(tag));
    });
  }


  // 8. Date Range
  let fromDate, toDate;
  switch(filters.dateType) {

    case 'month':
    case 'week':
    case 'day':
      fromDate = moment().subtract(1, filters.dateType).format('YYYY-MM-DD');
      toDate = moment().format('YYYY-MM-DD');
      break;

    default:
      if(_.isString(filters.fromDate) && _.isEmpty(filters.fromDate) === false) {
        fromDate = filters.fromDate;
      }
      if(_.isString(filters.toDate) && _.isEmpty(filters.toDate) === false) {
        toDate = filters.toDate
      }

  }
  queryArgs.push(encodeURIComponent('article_filter[from_date]') + '=' + encodeURIComponent(fromDate));
  queryArgs.push(encodeURIComponent('article_filter[to_date]') + '=' + encodeURIComponent(toDate));



  // set pagination on options
  queryArgs.push(encodeURIComponent('per_page') + '=' + encodeURIComponent(filters.perPage));
  queryArgs.push(encodeURIComponent('page') + '=' + encodeURIComponent(filters.page));


  return url +'?' + queryArgs.join('&');


}




////////////////////////////
// ASYNC SUPPORT CREATORS //
////////////////////////////



// only referenced locally for async methods; could export in basic creators somewhere else
// to be loaded into a separate async actions file
function searchArticlesRequest(requested) {
  return  {
    type : ActionTypes.SEARCH_ARTICLES_REQUEST,
    requested
  }
}

function searchArticlesSuccess(data, retrieved) {

  return  {
            type      : ActionTypes.SEARCH_ARTICLES_SUCCESS,
            data,
            retrieved
          };
}

function searchArticlesError(code, message, retrieved) {
  return  {
            type      : ActionTypes.SEARCH_ARTICLES_ERROR,
            error     : { code, message },
            retrieved
          };
}
