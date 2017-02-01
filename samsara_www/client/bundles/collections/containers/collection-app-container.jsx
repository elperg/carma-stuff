import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import { Translate } from 'react-redux-i18n';

import AddToCollection from 'lib/components/add-to-collection'
import ArticleList from 'lib/components/article-list'
import ExportMultipleArticles from 'lib/components/export-multiple-articles';
import SelectAllArticles from 'lib/components/select-all-articles';
import Loader from 'lib/components/loader';

import CollectionHeader from '../components/collection-header';
import CollectionFilters from '../components/collection-filters';

import fetchArticlesForCollection from '../actions/fetch-articles-for-collection';

import { exportSelectedArticles, exportAllArticles } from 'lib/actions/export';
import { addSelectedArticlesToNewCollection, addSelectedArticlesToExistingCollection } from 'lib/actions/add-to-collection';
import { selectItem, deselectItem, selectAll, deselectAll } from 'lib/actions/selection';

import createCollection from '../actions/create-collection';
import deleteCollection from '../actions/delete-collection';
import updateCollection from '../actions/update-collection';


class CollectionAppContainer extends React.Component {

  static propTypes = {

    articles            : PropTypes.array.isRequired,
    collections         : PropTypes.array.isRequired,

    selectedCollection  : PropTypes.object,

    selectedArticleIds  : PropTypes.array.isRequired,

    isFetchingArticles  : PropTypes.bool.isRequired,
    isUpdatingCollection: PropTypes.bool.isRequired,

    fetchArticlesForCollection: PropTypes.func.isRequired,

    exportActions     : PropTypes.shape({
                          exportSelected  : PropTypes.func.isRequired,
                          exportAll       : PropTypes.func.isRequired
                        }).isRequired,

    collectionActions : PropTypes.shape({
                          addToNewCollection      : PropTypes.func.isRequired,
                          addToExistingCollection : PropTypes.func.isRequired
                        }).isRequired,

    editCollectionActions : PropTypes.shape({
                              createCollection  : PropTypes.func.isRequired,
                              updateCollection  : PropTypes.func.isRequired,
                              deleteCollection  : PropTypes.func.isRequired
                            }).isRequired,

    selectionActions  : PropTypes.shape({
                          select      : PropTypes.func.isRequired,
                          deselect    : PropTypes.func.isRequired
                        }).isRequired

  };

  state = {
    articles  : []
  };

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, ['filterArticles', 'addToExistingCollection', 'addToNewCollection']);
  }

  componentWillMount() {
    this.setState({ articles: this.props.articles });
  }

  componentDidMount() {

    if(this.props.params.collectionId === undefined && this.props.collections.length > 0) {
      // we're at /project/.../collections, so let's re-route to /project/.../collections/{id} of first collection
      browserHistory.push(this.props.location.pathname + '/' + this.props.collections[0].id);
      return ;
    }

    // if we have a collectionId, get it
    if(this.props.params.collectionId !== undefined) {

      // if we don't have a collection for that id (404), redirect to index
      if(_.find(this.props.collections, {id: parseInt(this.props.params.collectionId) }) === undefined) {
        browserHistory.push('/projects/'+this.props.params.projectUid+'/collections');
        return ;
      }

      this.props.fetchArticlesForCollection(parseInt(this.props.params.collectionId));
    }
  }

  componentWillReceiveProps(nextProps) {

    const theCollection = _.find(nextProps.collections, {id: parseInt(nextProps.params.collectionId) });

    // redirect logic
    if(theCollection === undefined) {

      if(nextProps.params.collectionId === undefined && nextProps.collections.length > 0) {
        // we're at /project/.../collections, so let's re-route to /project/.../collections/{id} of first collection
        browserHistory.push(nextProps.location.pathname + '/' + nextProps.collections[0].id);
      } else {
        browserHistory.push('/projects/'+nextProps.params.projectUid+'/collections');
      }

      return ;
    }

    if(nextProps.params.collectionId !== undefined &&
      (this.props.params.collectionId !== nextProps.params.collectionId || theCollection.articles === undefined)) {
      this.props.fetchArticlesForCollection(parseInt(nextProps.params.collectionId));
    }

    this.setState({ articles: nextProps.articles });
  }

  filterArticles(query) {

    if(_.isEmpty(query.trim()) === false) {

      const queryRegEx = new RegExp(query.trim(), 'gmi');

      // Filter articles in props and update state
      const filteredArticles = _.filter(this.props.articles, (article) => {
        return (
          (queryRegEx.test(article.primaryHeadline) === true) ||
          (queryRegEx.test(article.primarySummary) === true) ||
          (article.secondaryHeadline !== null && queryRegEx.test(article.secondaryHeadline) === true) ||
          (article.secondarySummary !== null && queryRegEx.test(article.secondarySummary) === true)
        );
      });

      this.setState({ articles: filteredArticles });

    } else {

      this.setState({ articles: this.props.articles });

    }
  }

  addToExistingCollection(collectionId, selectedArticleIds) {
    const articles = this.props.articles.filter((article) => { return selectedArticleIds.indexOf(article.id) > -1 });
    this.props.collectionActions.addToExistingCollection(collectionId, articles);
  }

  addToNewCollection(newCollectionProps, selectedArticleIds) {
    const articles = this.props.articles.filter((article) => { return selectedArticleIds.indexOf(article.id) > -1 });
    this.props.collectionActions.addToNewCollection(newCollectionProps, articles);
  }

  render() {
    return (
      <div className='collections-app flex-1to4'>

        <CollectionFilters
          urlRoot={`/projects/${this.props.params.projectUid}/collections/`}
          collections={this.props.collections}
          selectedCollection={this.props.selectedCollection}
          filterResults={this.filterArticles}
        />

        <section ref='section' className='collections articles primary-content' id='articles'>

          <CollectionHeader
            selectedCollection={this.props.selectedCollection}
            isUpdatingCollection={this.props.isUpdatingCollection}
            actions={this.props.editCollectionActions}
          />

          <div className="toolbar">

            <div className='actions'>
              <SelectAllArticles
                selectedArticleIds={this.props.selectedArticleIds}
                articles={this.props.articles}
                actions={this.props.selectionActions}
              />

              <AddToCollection
                isUpdatingCollection={this.props.isUpdatingCollection}
                selectedArticleIds={this.props.selectedArticleIds}
                collections={this.props.collections}
                actions={{
                  addToExistingCollection: this.addToExistingCollection,
                  addToNewCollection: this.addToNewCollection
                }}
              />

              <ExportMultipleArticles
                selectedCount={this.props.selectedArticleIds.length}
                totalCount={this.props.articles.length}
                actions={this.props.exportActions}
              />

            </div>

            <div className="pagination">
              <span ref="summary" className="summary"><Translate value='collections.index.article_count' count={this.props.articles.length} /></span>
            </div>

          </div>


          <Loader loaded={!this.props.isFetchingArticles}>
            <ArticleList
              articles={this.state.articles}
              selectionActions={this.props.selectionActions}
              selectedArticleIds={this.props.selectedArticleIds}
              projectUid={this.props.params.projectUid}
            />
          </Loader>


        </section>

      </div>
    );
  }

}



const mapStateToProps = (state, ownProps) => {

  const selectedProject = _.find(state.projects.data, { uid: ownProps.params.projectUid});
  const selectedCollection = _.find(selectedProject.collections, { id: parseInt(ownProps.params.collectionId) });

  // pass a basic object if selectedCollection.articles is undefined (it will be at first)
  const collectionArticles = (selectedCollection !== undefined && selectedCollection.articles !== undefined) ? selectedCollection.articles : { data: [], isBusy: false };

  return {
    articles            : collectionArticles.data,
    collections         : selectedProject.collections,
    selectedCollection  : selectedCollection,

    selectedArticleIds  : state.selectedArticleIds,

    isFetchingArticles  : collectionArticles.isBusy,
    isUpdatingCollection: state.projects.isBusy
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {

    fetchArticlesForCollection: (id) => { dispatch(fetchArticlesForCollection(id, ownProps.params.projectUid)); },

    collectionActions: {
      addToNewCollection: (newCollectionProps, articles) => {
        dispatch(addSelectedArticlesToNewCollection(newCollectionProps, articles, ownProps.params.projectUid));
      },
      addToExistingCollection: (collectionId, articles) => {
        dispatch(addSelectedArticlesToExistingCollection(collectionId, articles, ownProps.params.projectUid));
      }
    },

    editCollectionActions: {
      createCollection  : (props) => { dispatch(createCollection(props, ownProps.params.projectUid)); },
      updateCollection  : (id, props) => { dispatch(updateCollection(id, props, ownProps.params.projectUid)); },
      deleteCollection  : (id) => { dispatch(deleteCollection(id, ownProps.params.projectUid)); }
    },

    exportActions: {
      exportSelected: (format) => { dispatch(exportSelectedArticles(format)); },
      exportAll: (format) => { dispatch(exportAllArticles(format)); }
    },

    selectionActions: {
      select: (id) => { dispatch(selectItem(id)); },
      deselect: (id) => { dispatch(deselectItem(id)); },
      selectAll: (ids) => { dispatch(selectAll(ids)); },
      deselectAll: () => { dispatch(deselectAll()); },
    },
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(CollectionAppContainer);
