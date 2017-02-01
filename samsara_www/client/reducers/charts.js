import ActionTypes from 'lib/action-types';
import InitialStates from 'lib/initial-states';

/*
  Relevant Action Types:

  FETCH_TAGS_CHART_REQUEST      : 'FETCH_TAGS_CHART_REQUEST',
  FETCH_TAGS_CHART_SUCCESS      : 'FETCH_TAGS_CHART_SUCCESS',
  FETCH_TAGS_CHART_ERROR        : 'FETCH_TAGS_CHART_ERROR',

  FETCH_AVE_CHART_REQUEST      : 'FETCH_AVE_CHART_REQUEST',
  FETCH_AVE_CHART_SUCCESS      : 'FETCH_AVE_CHART_SUCCESS',
  FETCH_AVE_CHART_ERROR        : 'FETCH_AVE_CHART_ERROR',

  FETCH_IMPRESSIONS_CHART_REQUEST      : 'FETCH_IMPRESSIONS_CHART_REQUEST',
  FETCH_IMPRESSIONS_CHART_SUCCESS      : 'FETCH_IMPRESSIONS_CHART_SUCCESS',
  FETCH_IMPRESSIONS_CHART_ERROR        : 'FETCH_IMPRESSIONS_CHART_ERROR',

  FETCH_LANGUAGES_CHART_REQUEST      : 'FETCH_LANGUAGES_CHART_REQUEST',
  FETCH_LANGUAGES_CHART_SUCCESS      : 'FETCH_LANGUAGES_CHART_SUCCESS',
  FETCH_LANGUAGES_CHART_ERROR        : 'FETCH_LANGUAGES_CHART_ERROR',

  FETCH_MEDIA_TYPES_CHART_REQUEST      : 'FETCH_MEDIA_TYPES_CHART_REQUEST',
  FETCH_MEDIA_TYPES_CHART_SUCCESS      : 'FETCH_MEDIA_TYPES_CHART_SUCCESS',
  FETCH_MEDIA_TYPES_CHART_ERROR        : 'FETCH_MEDIA_TYPES_CHART_ERROR',

  FETCH_OUTLETS_CHART_REQUEST      : 'FETCH_OUTLETS_CHART_REQUEST',
  FETCH_OUTLETS_CHART_SUCCESS      : 'FETCH_OUTLETS_CHART_SUCCESS',
  FETCH_OUTLETS_CHART_ERROR        : 'FETCH_OUTLETS_CHART_ERROR',

  FETCH_REGIONAL_ENGAGEMENT_CHART_REQUEST      : 'FETCH_REGIONAL_ENGAGEMENT_CHART_REQUEST',
  FETCH_REGIONAL_ENGAGEMENT_CHART_SUCCESS      : 'FETCH_REGIONAL_ENGAGEMENT_CHART_SUCCESS',
  FETCH_REGIONAL_ENGAGEMENT_CHART_ERROR        : 'FETCH_REGIONAL_ENGAGEMENT_CHART_ERROR',

  FETCH_REGIONAL_SENTIMENT_CHART_REQUEST      : 'FETCH_REGIONAL_SENTIMENT_CHART_REQUEST',
  FETCH_REGIONAL_SENTIMENT_CHART_SUCCESS      : 'FETCH_REGIONAL_SENTIMENT_CHART_SUCCESS',
  FETCH_REGIONAL_SENTIMENT_CHART_ERROR        : 'FETCH_REGIONAL_SENTIMENT_CHART_ERROR',

  FETCH_TAGS_CHART_REQUEST      : 'FETCH_TAGS_CHART_REQUEST',
  FETCH_TAGS_CHART_SUCCESS      : 'FETCH_TAGS_CHART_SUCCESS',
  FETCH_TAGS_CHART_ERROR        : 'FETCH_TAGS_CHART_ERROR'
*/

export default function(state = InitialStates.charts, action) {


  const actionTypeRegExRes = /^FETCH_([A-Z_]+)_CHART_(REQUEST|FETCH|SUCCESS)$/.exec(action.type);

  // if it's not one of our chart, return null
  if(actionTypeRegExRes === null) {
    return state;
  }

  // get the key of the charts state from the action type
  const chartKey = actionTypeRegExRes[1].toLowerCase().replace(/_([a-z])/g, (match) => { match.toUpperCase() });
  const actionType = actionTypeRegExRes[2];


  let newChartState;

  switch(actionType) {

    case 'REQUEST':
      newChartState = Object.assign({}, state[chartKey], {
        isBusy    : true,
        errors    : null,
        requested : action.requested,
        retrieved : null,
        data      : null
      });
      return Object.assign({}, state, { [chartKey]: newChartState });

    case 'SUCCESS':
      newChartState = Object.assign({}, state[chartKey], {
        isBusy    : false,
        retrieved : action.retrieved,
        data      : action.data
      });
      return Object.assign({}, state, { [chartKey]: newChartState });

    case 'ERROR':
      newChartState = Object.assign({}, state[chartKey], {
        isBusy    : false,
        errors    : action.errors,
        retrieved : action.retrieved,
        data      : null
      });
      return Object.assign({}, state, { [chartKey]: newChartState });

    default:
      return state;

  }

}
