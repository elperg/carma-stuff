import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { Router, IndexRoute, IndexRedirect, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { loadTranslations, setLocale, syncTranslationWithStore, i18nReducer } from 'react-redux-i18n';

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';


import enTranslations from '../localization/translations/en/translations.json';

import InitialStates from './lib/initial-states';

import article from './reducers/article';
import charts from './reducers/charts';
import digests from './reducers/digests';
import filterOptions from './reducers/filter-options';
import overview from './reducers/overview';
import projects from './reducers/projects';
import organization from './reducers/organization';
import organizationsIndex from './reducers/organizations-index';
import projectsIndex from './reducers/projects-index';
import search from './reducers/search';
import selectedArticleIds from './reducers/selected-article-ids';
import user from './reducers/user';
import experts from './reducers/experts'


import AppComponent from './app-component';
import NotFound404 from './bundles/nav/components/not-found-404';

import LoginContainer from './bundles/login/containers/login-container';
import ArticleListAppContainer from './bundles/articles/containers/article-list-app-container';
import ArticleDetailAppContainer from './bundles/articles/containers/article-detail-app-container';
import ChartsAppContainer from './bundles/charts/containers/charts-app-container';
import CollectionAppContainer from './bundles/collections/containers/collection-app-container';
import OrganizationsAppContainer from './bundles/organizations/containers/organizations-app-container';
import ProfileAppContainer from './bundles/profile/containers/profile-app-container';
import LogoutContainer from './bundles/login/containers/logout-container';
import MyCarmaContainer from './bundles/mycarma/containers/mycarma-container';
import SocialContainer from './bundles/social/containers/social-container';

import ProjectOverviewAppContainer from './bundles/overview/containers/project-overview-app-container';

import ProjectsIndexAppContainer from './bundles/projects/containers/projects-index-app-container';
import UserProjectsAppContainer from './bundles/projects/containers/user-projects-app-container';


import ExpertsIndexAppContainer from './bundles/experts/containers/experts-index-app-container';
import ExpertsCategoryIndexContainer from './bundles/experts/containers/experts-categories-index-container';
import ExpertsAuthorContainer from './bundles/experts/containers/experts-author-container';
import ExpertsDetailContainer from './bundles/experts/containers/experts-detail-container';

const rootReducer = combineReducers({
                                      article,
                                      charts,
                                      digests,
                                      filterOptions,
                                      overview,
                                      projects,
                                      organization,
                                      organizationsIndex,
                                      experts,
                                      projectsIndex,
                                      search,
                                      selectedArticleIds,
                                      user,
                                      routing: routerReducer,
                                      i18n: i18nReducer
                                    });



const loggerMiddleware = createLogger();


// check to see if we already have a samsara user object
let initialState = Object.assign({}, InitialStates);

if(localStorage.getItem('samsara-user') !== null) {

  const initData = JSON.parse(localStorage.getItem('samsara-user'));

  initialState.user.data = initData;
  initialState.user.isLoggedIn = true;

}


const store = configureStore(initialState);

// Load up translations and sync with store

const translations = { 'en': enTranslations };

syncTranslationWithStore(store)
store.dispatch(loadTranslations(translations));
store.dispatch(setLocale('en'));



// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={AppComponent}>
        <IndexRedirect to="/projects" />

        <Route path='organizations' component={OrganizationsAppContainer} />
        <Route path='organizations/:organizationUid' component={ProjectsIndexAppContainer} />

        <Route path='projects' component={UserProjectsAppContainer} />

        <Route path='projects/:projectUid/articles'>
          <IndexRoute component={ArticleListAppContainer} />
          <Route path=':articleUid' component={ArticleDetailAppContainer} />
        </Route>

        <Route path='projects/:projectUid/collections'>
          <IndexRoute component={CollectionAppContainer} />
          <Route path=':collectionId' component={CollectionAppContainer} />
        </Route>

        <Route path='projects/:projectUid/charts'>
          <IndexRoute component={ChartsAppContainer} />
          <Route path='ave' component={ChartsAppContainer} />
          <Route path='impressions' component={ChartsAppContainer} />
          <Route path='languages' component={ChartsAppContainer} />
          <Route path='media-types' component={ChartsAppContainer} />
          <Route path='outlets' component={ChartsAppContainer} />
          <Route path='regional-engagement' component={ChartsAppContainer} />
          <Route path='regional-sentiment' component={ChartsAppContainer} />
          <Route path='sentiment' component={ChartsAppContainer} />
          <Route path='tags' component={ChartsAppContainer} />
        </Route>

        <Route path='projects/:projectUid/overview' component={ProjectOverviewAppContainer} />

        <Route path='projects/:projectUid/mycarma' component={MyCarmaContainer} />
        <Route path='projects/:projectUid/social' component={SocialContainer} />


          <Route path='projects/:projectUid/experts' component={ExpertsIndexAppContainer} />

          <Route path='projects/:projectUid/experts/categories/:smeCategoryIds' component={ExpertsCategoryIndexContainer} />
          <Route path='projects/:projectUid/experts/author/:authorId' component={ExpertsAuthorContainer} />
          <Route path='projects/:projectUid/experts/categories/:smeCategoryIds' component={ExpertsCategoryIndexContainer} />



        <Route path='profile' component={ProfileAppContainer} />

        <Route path='a/:articleUid' component={ArticleDetailAppContainer} />

        <Route path='login' component={LoginContainer} />
        <Route path='logout' component={LogoutContainer} />

        <Route path="*" component={NotFound404} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('mount')
)





function configureStore(seededState = {}) {

  const initialState = Object.assign({}, InitialStates, seededState);

  const composedStore = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );

  const storeCreator = composedStore(createStore);

  return storeCreator(rootReducer, initialState)
}
