import ActionTypes from 'lib/action-types';
import InitialStates from 'lib/initial-states';
import _ from 'lodash';


// Combined reducers for "projects"
export default function(state = InitialStates.projects, action) {

  switch(action.type) {

    case ActionTypes.FETCH_USERINFO_REQUEST:
    case ActionTypes.FETCH_USERINFO_SUCCESS:
    case ActionTypes.FETCH_USERINFO_ERROR:
      return handleUserInfo(state, action);

    case ActionTypes.FETCH_COLLECTION_ARTICLES_REQUEST:
    case ActionTypes.FETCH_COLLECTION_ARTICLES_SUCCESS:
    case ActionTypes.FETCH_COLLECTION_ARTICLES_ERROR:
      return handleCollectionArticles(state, action);

    case ActionTypes.DELETE_COLLECTION_REQUEST:
    case ActionTypes.DELETE_COLLECTION_SUCCESS:
    case ActionTypes.DELETE_COLLECTION_ERROR:
      return handleDeleteCollection(state, action);

    case ActionTypes.UPDATE_COLLECTION_REQUEST:
    case ActionTypes.UPDATE_COLLECTION_SUCCESS:
    case ActionTypes.UPDATE_COLLECTION_ERROR:
      return handleUpdateCollection(state, action);

    case ActionTypes.CREATE_COLLECTION_REQUEST:
    case ActionTypes.CREATE_COLLECTION_SUCCESS:
    case ActionTypes.CREATE_COLLECTION_ERROR:
      return handleCreateCollection(state, action);

    case ActionTypes.ADD_TO_COLLECTION_REQUEST:
    case ActionTypes.ADD_TO_COLLECTION_SUCCESS:
    case ActionTypes.ADD_TO_COLLECTION_ERROR:
      return handleAddToCollection(state, action);
    default:
      return state;
  }

}


export function handleCollectionArticles(state, action) {

  // pull context from action: context will have `projectUid` and `collectionId`
  const currentProject = _.find(state.data, { uid: action.context.projectUid });
  const remainingProjects = _.without(state.data, currentProject);

  const currentCollection = _.find(currentProject.collections, { id: action.context.collectionId });
  const remainingCollections = _.without(currentProject.collections, currentCollection);

  let newCollectionArticlesState;

  switch(action.type) {

    case ActionTypes.FETCH_COLLECTION_ARTICLES_REQUEST:
      newCollectionArticlesState = {
        isBusy    : true,
        requested : action.requested,
        data      : [],
        errors    : null
      };
      break;

    case ActionTypes.FETCH_COLLECTION_ARTICLES_SUCCESS:
      newCollectionArticlesState = {
        isBusy    : false,
        retrieved : action.retrieved,
        data      : action.data.articles,
        errors    : null
      };
      break;

    case ActionTypes.FETCH_COLLECTION_ARTICLES_ERROR:
      newCollectionArticlesState = {
        isBusy    : false,
        retrieved : action.retrieved,
        data      : [],
        errors    : action.errors
      };
      break;

    default:
      return state;
  }

  // update the collection state
  const newCollectionState = Object.assign({}, currentCollection, { articles: newCollectionArticlesState });

  // update project state
  const newProjectState = Object.assign({}, currentProject, { collections: _.sortBy([...remainingCollections, newCollectionState ], 'name') });


  // finally, return the full state of projects
  return Object.assign({}, state, {
    data: [...remainingProjects, newProjectState ]
  });

}


export function handleDeleteCollection(state, action) {

  // pull context from action: context will have `projectUid` and `collectionId`
  const currentProject = _.find(state.data, { uid: action.context.projectUid });
  const remainingProjects = _.without(state.data, currentProject);

  const currentCollection = _.find(currentProject.collections, { id: action.context.collectionId });
  const remainingCollections = _.without(currentProject.collections, currentCollection);

  let newState;

  switch(action.type) {

    case ActionTypes.DELETE_COLLECTION_REQUEST:
      return Object.assign({}, state, {
        isBusy    : true,
        requested : action.requested,
        errors    : null
      });

    case ActionTypes.DELETE_COLLECTION_SUCCESS:
      const newProjectState = Object.assign({}, currentProject, { collections: _.sortBy([...remainingCollections ], 'name') });
      return Object.assign({}, state, {
        isBusy: false,
        retrieved : action.retrieved,
        data: [...remainingProjects, newProjectState ]
      });

    case ActionTypes.DELETE_COLLECTION_ERROR:
      return Object.assign({}, state, {
        isBusy    : false,
        retrieved : action.retrieved,
        errors    : action.errors
      });

    default:
      return state;
  }

}



export function handleUpdateCollection(state, action) {

  // pull context from action: context will have `projectUid` and `collectionId`
  const currentProject = _.find(state.data, { uid: action.context.projectUid });
  const remainingProjects = _.without(state.data, currentProject);

  const currentCollection = _.find(currentProject.collections, { id: action.context.collectionId });
  const remainingCollections = _.without(currentProject.collections, currentCollection);

  switch(action.type) {

    case ActionTypes.UPDATE_COLLECTION_REQUEST:
      return Object.assign({}, state, {
        isBusy    : true,
        requested : action.requested,
        errors    : null
      });

    case ActionTypes.UPDATE_COLLECTION_SUCCESS:
      const newCollectionState = Object.assign({}, currentCollection, action.data);
      const newProjectState = Object.assign({}, currentProject, { collections: _.sortBy([...remainingCollections, newCollectionState ], 'name') });
      return Object.assign({}, state, {
        isBusy: false,
        retrieved : action.retrieved,
        data: [...remainingProjects, newProjectState ]
      });

    case ActionTypes.UPDATE_COLLECTION_ERROR:
      return Object.assign({}, state, {
        isBusy    : false,
        retrieved : action.retrieved,
        errors    : action.errors
      });

    default:
      return state;
  }


}


export function handleCreateCollection(state, action) {

  // pull context from action: context will have `projectUid` and `collectionId`
  const currentProject = _.find(state.data, { uid: action.context.projectUid });
  const remainingProjects = _.without(state.data, currentProject);

  const currentCollection = _.find(currentProject.collections, { id: action.context.collectionId });
  const remainingCollections = _.without(currentProject.collections, currentCollection);

  let newState;

  switch(action.type) {

    case ActionTypes.CREATE_COLLECTION_REQUEST:
      return Object.assign({}, state, {
        isBusy    : true,
        requested : action.requested,
        errors    : null
      });

    case ActionTypes.CREATE_COLLECTION_SUCCESS:
      const newCollection = Object.assign({},
                              action.data,
                              { articles: { isBusy: false, retrieved: null, data: [], errors: null }
                            });
      const newProjectState = Object.assign({}, currentProject, { collections: _.sortBy([...remainingCollections, newCollection ], 'name') });
      return Object.assign({}, state, {
        isBusy: false,
        retrieved : action.retrieved,
        data: [...remainingProjects, newProjectState ]
      });

    case ActionTypes.CREATE_COLLECTION_ERROR:
      return Object.assign({}, state, {
        isBusy    : false,
        retrieved : action.retrieved,
        errors    : action.errors
      });

    default:
      return state;
  }


}


export function handleAddToCollection(state, action) {

  // pull context from action: context will have `projectUid` and `collectionId`
  const currentProject = _.find(state.data, { uid: action.context.projectUid });
  const remainingProjects = _.without(state.data, currentProject);

  const currentCollection = _.find(currentProject.collections, { id: action.context.collectionId });
  const remainingCollections = _.without(currentProject.collections, currentCollection);
  const currentCollectionArticles = currentCollection.articles;

  switch(action.type) {

    case ActionTypes.ADD_TO_COLLECTION_REQUEST:
      return Object.assign({}, state, {
        isBusy    : true,
        requested : action.requested,
        errors    : null
      });

    case ActionTypes.ADD_TO_COLLECTION_SUCCESS:
      const newArticlesState = {
        isBusy    : false,
        retrieved : action.retrieved,
        data      : action.data.articles,
        errors    : null
      };
      const newCollectionState = Object.assign({}, currentCollection, { articles:  newArticlesState });
      const newProjectState = Object.assign({}, currentProject, { collections: _.sortBy([...remainingCollections, newCollectionState ], 'name') });
      return Object.assign({}, state, {
        isBusy: false,
        retrieved : action.retrieved,
        data: [...remainingProjects, newProjectState ]
      });


    case ActionTypes.ADD_TO_COLLECTION_ERROR:
      return Object.assign({}, state, {
        isBusy    : false,
        retrieved : action.retrieved,
        errors    : action.errors
      });

    default:
      return state;
  }

}



// For handling user info actions
export function handleUserInfo(state, action) {

  switch(action.type) {

    case ActionTypes.FETCH_USERINFO_REQUEST:
      return Object.assign({}, state, {
          isBusy    : true,
          errors    : null,
          requested : action.requested,
          retrieved : null,
          data      : []
        });

    case ActionTypes.FETCH_USERINFO_SUCCESS:
      const projects = action.data.projects.map((project) => {
        return Object.assign({}, project, { collections: _.sortBy(project.collections, 'name') });
      });

      // if there's only one project, select it
      const selectedUid = (projects.length === 1) ? projects[0].uid : null;

      return Object.assign({}, state, {
          isBusy    : false,
          errors    : null,
          retrieved : action.retrieved,
          data      : projects,
          selectedUid: selectedUid
        });

    case ActionTypes.FETCH_USERINFO_ERROR:
      return Object.assign({}, state, {
          isBusy    : false,
          errors    : action.errors,
          retrieved : action.retrieved,
          data      : {}
        });

    default:
      return state;
  }

}
