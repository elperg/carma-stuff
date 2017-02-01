import ActionTypes from '../lib/action-types';

/*
  STATE

    {
      isBusy    : false,
      errors    : [],
      passwordErrors: [],
      requested : null,
      retrieved : '2016-09-23T23:34',
      data      : {
                    id              : 1,
                    firstName       : 'Juliette',
                    lastName        : 'Binoche',
                    email           : 'jb.smoove@carma.com',
                    accessToken     :  'ffffbd0cfffff01140d859fb0fffffcb',
                    organizationId  : 2,
                    projectIds      : [ 32, 34 ],
                    timeZone        : 'Eastern Time (US & Canada)',
                    language        : 'en'
                    digests         : [
                                        {
                                          id          : 1,
                                          localTimes  : ['7:00', '9:00'],
                                          projects    : [ 32, 34 ]
                                        }
                                      ],
                  }
    }

*/

export default function(state = {}, action) {

  switch(action.type) {

    case ActionTypes.FETCH_USERINFO_REQUEST:
    case ActionTypes.LOGIN_REQUEST:
    case ActionTypes.UPDATE_PROFILE_REQUEST:
      return Object.assign({}, state, {
          isBusy    : true,
          errors    : null,
          requested : action.requested,
          retrieved : (action.type === ActionTypes.UPDATE_PROFILE_REQUEST) ? state.retrieved : null, // only clear data on login_request / userinfo_request
          data      : (action.type === ActionTypes.UPDATE_PROFILE_REQUEST) ? state.data : {}    // only clear data on login_request / userinfo_request
        });

    case ActionTypes.FETCH_USERINFO_SUCCESS:
      return Object.assign({}, state, {
          isBusy    : false,
          errors    : null,
          retrieved : action.retrieved,
          isPopulated: true,
          data      : action.data.user
        });

    case ActionTypes.UPDATE_PROFILE_SUCCESS:
      return Object.assign({}, state, {
          isBusy    : false,
          errors    : null,
          retrieved : action.retrieved,
          data      : Object.assign({}, state.data, action.data)
        });

    case ActionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, {
          isBusy    : false,
          errors    : null,
          retrieved : action.retrieved,
          isLoggedIn: true,
          data      : action.data
        });

    case ActionTypes.FETCH_USERINFO_ERROR:
    case ActionTypes.LOGIN_ERROR:
    case ActionTypes.UPDATE_PROFILE_ERROR:
      return Object.assign({}, state, {
          isBusy    : false,
          errors    : action.errors,
          retrieved : action.retrieved,
          data      : (action.type === ActionTypes.UPDATE_PROFILE_ERROR) ? state.data : {}    // only clear data on login_error / userinfo_error
        });

    case ActionTypes.CHANGE_PASSWORD_REQUEST:
      return Object.assign({}, state, {
          isBusy          : true,
          passwordErrors  : null
        });

    case ActionTypes.CHANGE_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
          isBusy: false
      });

    case ActionTypes.CHANGE_PASSWORD_ERROR:
      return Object.assign({}, state, {
          isBusy          : false,
          passwordErrors  : action.errors
      });



    default:
      return state;
  }

}
