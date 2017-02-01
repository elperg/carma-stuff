import ActionTypes from 'lib/action-types';
import makeFetch from 'lib/utils/make-fetch';


/*
  POST props:
{
  "projectId": "686",
  "email_digest" : "1",
  "merge_digest" : "1",
  "user_project_email_digests_attributes" :
  {"77678" : {"id" : "77678", "_destroy" : "false", "send_at" : "8:30"}}}


FROM:
[
  {
    "projectId" : 234,
    "isEnabled" : true,
    "isMerged"  : true,
    "order"     : 1,
    "deliveryTimes": [
                      {
                        "id"      : 99999,
                        "minute"  : 30,
                        "hour"    : 9,
                        "destroy" : true
                      },
                      {
                        "minute"  : 0,
                        "hour"    : 13
                      }
                      ]
  },
  {
    "projectId" : 235,
    "isEnabled" : false,
    "isMerged"  : true,
    "order"     : 2,
    "deliveryTimes": []
  }
]


*/

export default function updateDigests(digestsArray) {

  return (dispatch, getState) => {

    const state = getState();

    // if we're already fetching, don't fire another fetch
    if(state.digests.isBusy === true) {
      return Promise.resolve();
    }

    const props = { digests: mapPropsForPost(digestsArray) };

  console.log("updateDigests.  mapped props = ",props);


    const fetchOpts = {
      url           : '/api/v2/profile/digests',
      token         : state.user.data.accessToken,
      httpMethod    : 'PATCH',
      body          : props,
      requestAction : updateDigestsRequest,
      successAction : updateDigestsSuccess,
      errorAction   : updateDigestsError
    };

    return makeFetch(fetchOpts, dispatch);

  }

}


function mapPropsForPost(digestsArray) {
  console.log("mapPropsForPost.  digestsArray = ",digestsArray);

  let patchObj = {};

  _.each(digestsArray,(projectDigests) => {

    console.log("projectDigests.deliveryTimes = ",projectDigests.deliveryTimes);

    const deliveryTimes = projectDigests.deliveryTimes.map((deliveryTime) => {
      console.log("deliveryTime = ",deliveryTime);

      const time = deliveryTime.hour+':'+deliveryTime.minute;
      const sendAt = (/[\d]{1,2}\:[\d]{2}/.test(time)) ? time : time+'0';


      let mappedTime = {
        sendAt,
        _destroy: (deliveryTime.destroy === true)
      };

      if(deliveryTime.id !== undefined) {
        mappedTime.id = deliveryTime.id
      }
      console.log("mappedTime = ",mappedTime);
      return mappedTime;
    });

    patchObj[projectDigests.projectId] = {
      projectId   : projectDigests.projectId,
      emailDigest : projectDigests.isEnabled,
      mergeDigest : projectDigests.isMerged,
      order       : projectDigests.order,
      userProjectEmailDigestsAttributes : deliveryTimes
    };

  });

  return patchObj;

}



function updateDigestsRequest(requested) {
  return  {
    type : ActionTypes.UPDATE_DIGESTS_REQUEST,
    requested
  }
}

function updateDigestsSuccess(data, retrieved) {
  return  {
            type      : ActionTypes.UPDATE_DIGESTS_SUCCESS,
            data,
            retrieved
          };
}

function updateDigestsError(code, message, retrieved) {
  return  {
            type      : ActionTypes.UPDATE_DIGESTS_ERROR,
            error     : { statusCode, message },
            retrieved
          };
}

