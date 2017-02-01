// USAGE
//  return makeFetch(opts, dispatch);

/*

  DISPATCH
    pass the redux dispatch method as the second arg provided by redux-thunk for dispatching actions

  OPTIONS PROPERTIES

    url *REQUIRED*
      a string, the URL to fetch from

    token *REQUIRED*
      a token for hitting the API

    httpMethod (optional)
      will automatically set to GET or POST, depending on existence of `body`

    body (optional)
      used when making POST, UPDATE, etc calls (NEVER for GET)

    requestAction *REQUIRED*
      an action creator, taking a request initiated Date() object as an arg:
        e.g.,
          function(requestedAt) {
            return {
              type: 'request',
              requestedAt
            }
          }

    successAction *REQUIRED*
      an action creator, taking the JSON data in the response and a timestamp as an argument:
        e.g.,
          function(data, receivedAt) {
            return {
              type: 'success',
              data,
              receivedAt
            }
          }

    errorAction *REQUIRED*
      an action creator, taking the an internal error code and an error message as arguments:
        e.g.,
          function(code, message, receivedAt) {
            return {
              type: 'error',
              code,
              message,
              receivedAt
            }
          }


  RETURNS

    a Promise object
*/

import fetch from 'isomorphic-fetch';
import _ from 'lodash';

import { API_HOST } from 'lib/app-constants';

export default function makeFetch(opts, dispatch) {

  // validateOpts() will throw an error if validation fails
  validateOpts(opts);

  // breakout options
  const { url, token, body, requestAction, successAction, errorAction } = opts;

  // check for optional httpMethod prop
  let httpMethod = opts.httpMethod;

  // if it's undefined, assume POST or GET it here.  if a `body` is provided, set httpMethod to POST
  if(httpMethod === undefined) {
    httpMethod = (body !== undefined) ? 'POST' : 'GET';
  }

  // Set the fetch options
  let fetchOpts = {
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': token
                    },
                    followRedirects: false,
                    method: httpMethod
                  };

  if(body !== undefined) {
    fetchOpts.body = JSON.stringify(camelCaseToRubyCase(body));
  }

  // Dispatch the request action
  try {
    dispatch(requestAction(Date.now()));
  } catch(e) {
    throw new Error("makeFetch(opts, dispatch): `requestAction()` threw: ",e);
  }

  try {
    return fetch(API_HOST + url, fetchOpts)
        .then((httpResponse) => {

          if(process.env.NODE_ENV !== 'production') {
            console.log("fetch.  then1. httpResponse, fetchOpts = ",httpResponse, fetchOpts);
          }

          // check for a bad HTTP respons estatus
          if(httpResponse.status >= 400) {

            try {
              var responseErrorObj = errorAction(httpResponse.status, "Bad response from server", Date.now());
            } catch(e) {
              throw new Error("makeFetch(opts, dispatch): `errorAction()` threw in `httpResponse`: ",e);
            }

            dispatch(responseErrorObj);

          } else {

            return httpResponse.json();
          }

        })
        .then((responseJSON) => {

          if(process.env.NODE_ENV !== 'production') {
            console.log("fetch.  then2. responseJSON = ",responseJSON);
          }

          // if stats.code === 0, we're OK!
          if(responseJSON.status.code === 0) {

            // we've got data!
            try {
              var successActionObj = successAction(responseJSON.data, Date.now())
            } catch(e) {
              throw new Error("makeFetch(opts, dispatch): `successAction()` threw in handling `responseJSON`: ",e);
            }

            // dispatch the success action object
            dispatch(successActionObj);


          } else {

            // we've got an error!
            try {
              var errorActionObj = errorAction(responseJSON.status.code, responseJSON.status.message, Date.now());
            } catch(e) {
              throw new Error("makeFetch(opts, dispatch): `errorAction()` threw in handling `responseJSON`: ",e);
            }

            // dispatch the error action object
            dispatch(errorActionObj);
          }

        })
        .catch((e) => {
          console.log("e = ",e)
          throw new Error("makeFetch(opts, dispatch): UNCAUGHT ERROR: ",e);
        });

  } catch(e) {
    throw new Error("makeFetch(opts, dispatch): threw error in fetch() operation: ",e);
  }

}


function camelCaseToRubyCase(camelCaseObj) {

  let rubyCaseObj = {};

  _.each(camelCaseObj, (val, oldKey) => {
    const newKey = regexDecamelize(oldKey);
    rubyCaseObj[newKey] = (_.isObject(val) === true) ? camelCaseToRubyCase(val) : val;
  });

  return rubyCaseObj;
}

function regexDecamelize(str) {
  if(_.isString(str) === true) {
    return str.replace(/[A-Z]/gm, (match) => {
      return '_'+match.toLowerCase();
    });
  } else {
    return str;
  }
}


function validateOpts(opts) {

  if(_.isString(opts.url) === false) {
    throw new Error('makeFetch(opts, dispatch): `opts.url` MUST be a string');
  }

  if(_.isString(opts.token) === false) {
    throw new Error('makeFetch(opts, dispatch): `opts.token` MUST be a string');
  }

  if(opts.body !== undefined && _.isObject(opts.body) === false || _.isString(opts.body) === true) {
    throw new Error('makeFetch(opts, dispatch): if `opts.body` is provided, it must be an object');
  }

  const validHTTPMethods = [ 'GET', 'PATCH', 'POST', 'PUT', 'UPDATE', 'DELETE' ];
  if(opts.httpMethod !== undefined && validHTTPMethods.indexOf(opts.httpMethod) < 0) {
    throw new Error('makeFetch(opts, dispatch): if `opts.httpMethod` is provided, it must be one of "GET", "PATCH", "POST", "PUT", "UPDATE" or "DELETE"');
  }

  if(_.isFunction(opts.requestAction) === false)  {
    throw new Error('makeFetch(opts, dispatch): `opts.requestAction` MUST be a function');
  }

  if(_.isFunction(opts.errorAction) === false)  {
    throw new Error('makeFetch(opts, dispatch): `opts.errorAction` MUST be a function');
  }

  if(_.isFunction(opts.successAction) === false)  {
    throw new Error('makeFetch(opts, dispatch): `opts.successAction` MUST be a function');
  }

}
