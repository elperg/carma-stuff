/*
import ActionTypes from 'client/bundles/articles/constants/action-types';
import InitialStates from 'client/bundles/articles/constants/initial-states';

import reducer from 'client/bundles/articles/reducers/connection';

describe('Connection Reducer', () => {

  describe('Fetching Articles', () => {

    let initialState;

    beforeEach(() => {

      initialState = {
                        isFetchingArticles  : -1,
                        articlesError       : -1
                      };

    });

    it('should return state with "isFetchingArticles" set to TRUE and articlesError set to NULL on "FETCH_ARTICLES_REQUEST"', () => {

      const expectedState = {
        isFetchingArticles  : true,
        articlesError       : null
      };

      const action = {
        type :  ActionTypes.FETCH_ARTICLES_REQUEST
      };

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(expectedState);

    });

    it('should return state with "isFetchingArticles" set to FALSE and articlesError set to NULL on "FETCH_ARTICLES_SUCCESS"', () => {

      const now = Date.now();

      const expectedState = {
        isFetchingArticles  : false,
        articlesError       : null,
        articlesReceivedAt  : now
      };

      const action = {
        type        :  ActionTypes.FETCH_ARTICLES_SUCCESS,
        receivedAt  : now
      };

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(expectedState);

    });

    it('should return state with "isFetchingArticles" set to FALSE and articlesError set to an error object on "FETCH_ARTICLES_ERROR"', () => {

      const now = Date.now();
      const anError = { code: 2, message: 'An error' };

      const expectedState = {
        isFetchingArticles  : false,
        articlesError       : anError,
        articlesReceivedAt  : now
      };

      const action = {
        type  : ActionTypes.FETCH_ARTICLES_ERROR,
        error : anError,
        receivedAt  : now
      };

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(expectedState);

    });

  });


  describe('Exporting Articles', () => {

    let initialState;

    beforeEach(() => {

      initialState = {
                        isPreparingExport  : -1,
                        prepareExportError       : -1
                      };

    });

    it('should return state with "isPreparingExport" set to TRUE and prepareExportError set to NULL on "PREPARE_EXPORT_REQUEST"', () => {

      const expectedState = {
        isPreparingExport   : true,
        prepareExportError  : null
      };

      const action = {
        type :  ActionTypes.PREPARE_EXPORT_REQUEST
      };

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(expectedState);

    });

    it('should return state with "isPreparingExport" set to FALSE and prepareExportError set to NULL on "PREPARE_EXPORT_SUCCESS"', () => {

      const now = Date.now();

      const expectedState = {
        isPreparingExport       : false,
        prepareExportError      : null,
        prepareExportReceivedAt : now
      };

      const action = {
        type        :  ActionTypes.PREPARE_EXPORT_SUCCESS,
        receivedAt  : now
      };

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(expectedState);

    });

    it('should return state with "isPreparingExport" set to FALSE and prepareExportError set to an error object on "PREPARE_EXPORT_ERROR"', () => {

      const now = Date.now();
      const anError = { code: 2, message: 'An error' };

      const expectedState = {
        isPreparingExport       : false,
        prepareExportError      : anError,
        prepareExportReceivedAt : now
      };

      const action = {
        type  : ActionTypes.PREPARE_EXPORT_ERROR,
        error : anError,
        receivedAt  : now
      };

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(expectedState);

    });

  });


  describe('Adding Articles to Collection', () => {

    let initialState;

    beforeEach(() => {

      initialState = {
                        isUpdatingCollection  : -1,
                        addToCollectionError  : -1
                      };

    });

    it('should return state with "isUpdatingCollection" set to TRUE and addToCollectionError set to NULL on "ADD_TO_COLLECTION_REQUEST"', () => {

      const expectedState = {
        isUpdatingCollection  : true,
        addToCollectionError  : null
      };

      const action = {
        type :  ActionTypes.ADD_TO_COLLECTION_REQUEST
      };

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(expectedState);

    });

    it('should return state with "isUpdatingCollection" set to FALSE and addToCollectionError set to NULL on "ADD_TO_COLLECTION_SUCCESS"', () => {

      const expectedState = {
        isUpdatingCollection  : false,
        addToCollectionError  : null
      };

      const action = {
        type        :  ActionTypes.ADD_TO_COLLECTION_SUCCESS
      };

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(expectedState);

    });

    it('should return state with "isUpdatingCollection" set to FALSE and addToCollectionError set to an error object on "ADD_TO_COLLECTION_ERROR"', () => {

      const anError = { code: 2, message: 'An error' };

      const expectedState = {
        isUpdatingCollection  : false,
        addToCollectionError  : anError,
      };

      const action = {
        type  : ActionTypes.ADD_TO_COLLECTION_ERROR,
        error : anError
      };

      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(expectedState);

    });

  });

});
*/
