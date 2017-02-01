import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import Loader from 'lib/components/loader';

import AddToCollection from 'lib/components/add-to-collection'
import ArticleFilters from '../components/article-filters';
import ArticleList from 'lib/components/article-list'
import ExportMultipleArticles from 'lib/components/export-multiple-articles';
import Pagination from 'lib/components/pagination';
import SelectAllArticles from 'lib/components/select-all-articles';

import searchArticles from '../actions/search-articles';

import {  paginationFirstPage,
          paginationPreviousPage,
          paginationNextPage,
          paginationLastPage } from 'lib/actions/pagination';

import { exportSelectedArticles, exportAllArticles } from 'lib/actions/export';

import { addSelectedArticlesToNewCollection, addSelectedArticlesToExistingCollection } from 'lib/actions/add-to-collection';

import { selectItem, deselectItem, selectAll, deselectAll } from 'lib/actions/selection';


class ArticleListAppContainer extends React.Component {

  static propTypes = {

    articles            : PropTypes.array.isRequired,
    collections         : PropTypes.array,

    selectedArticleIds  : PropTypes.array.isRequired,
    filterKeywords      : PropTypes.string,

    isFetchingArticles  : PropTypes.bool.isRequired,
    isUpdatingCollection: PropTypes.bool.isRequired,

    filterOptions     : PropTypes.shape({
                          location      : PropTypes.array.isRequired,
                          outlet        : PropTypes.array.isRequired,
                          mediaSubtype  : PropTypes.array.isRequired,
                          outletLanguage  : PropTypes.array.isRequired,
                          primaryLanguage : PropTypes.array.isRequired,
                          tag             : PropTypes.array.isRequired
                        }).isRequired,

    filterValues      : PropTypes.shape({
                          query               : PropTypes.string,
                          mediaSubtype        : PropTypes.array,
                          sentiment           : PropTypes.array,
                          location            : PropTypes.array,
                          outlet              : PropTypes.array,
                          outletLanguage      : PropTypes.array,
                          primaryLanguage     : PropTypes.array,
                          tag                 : PropTypes.array,
                          perPage             : PropTypes.number,
                          fromDate            : PropTypes.string, // YYYY-MM-DD
                          toDate              : PropTypes.string  // YYYY-MM-DD
                        }),

    paginationData    : PropTypes.shape({
                        totalCount  : PropTypes.number.isRequired,
                        pageSize    : PropTypes.number.isRequired,
                        page        : PropTypes.number.isRequired
                      }).isRequired,

    exportActions     : PropTypes.shape({
                          exportSelected  : PropTypes.func.isRequired,
                          exportAll       : PropTypes.func.isRequired
                        }).isRequired,

    collectionActions : PropTypes.shape({
                          addToNewCollection      : PropTypes.func.isRequired,
                          addToExistingCollection : PropTypes.func.isRequired
                        }).isRequired,

    selectionActions  : PropTypes.shape({
                          select      : PropTypes.func.isRequired,
                          deselect    : PropTypes.func.isRequired
                        }).isRequired,

    searchArticles  : PropTypes.func.isRequired
  };


  constructor(props, context) {
    super(props, context);
    _.bindAll(this, [ 'updateFilters',
                      'resetFilters',
                      'paginationFirstPage',
                      'paginationPreviousPage',
                      'paginationNextPage',
                      'paginationLastPage',
                      'addToExistingCollection',
                      'addToNewCollection'
                    ]);
  }

  componentDidMount() {
    // fire the 1st search
    this.props.searchArticles(this.props.filterValues);
  }

  componentWillReceiveProps(nextProps) {
    // if we have new filter values, fire search again
    if(_.isEqual(this.props.filterValues, nextProps.filterValues) !== true) {
      // scroll the window scrollbar to the top
      window.scrollTo(0,0);
      this.props.searchArticles(nextProps.filterValues);
    }
  }

  updateFilters(filters) {
    // update the browser history with new filters

    if(filters.dateType !== 'range') {
      delete filters.fromDate;
      delete filters.toDate;
    }

    browserHistory.push({ pathname: this.props.location.pathname, query: filters });
  }

  resetFilters() {
    browserHistory.push(this.props.location.pathname);
  }

  paginationFirstPage() {
    const newFilterValues = Object.assign({}, this.props.filterValues, { page: 1 });
    this.updateFilters(newFilterValues);
  }

  paginationPreviousPage() {
    const newFilterValues = Object.assign({}, this.props.filterValues, { page: this.props.filterValues.page-1 });
    this.updateFilters(newFilterValues);
  }

  paginationNextPage() {
    const newFilterValues = Object.assign({}, this.props.filterValues, { page: this.props.filterValues.page+1 });
    this.updateFilters(newFilterValues);
  }

  paginationLastPage() {
    const totalPages = Math.ceil(this.props.paginationData.totalCount / this.props.filterValues.perPage);
    const newFilterValues = Object.assign({}, this.props.filterValues, { page: totalPages });
    this.updateFilters(newFilterValues);
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
      <div className='article-list-app flex-1to4'>

        <ArticleFilters
          filterOptions={this.props.filterOptions}
          filterValues={this.props.filterValues}
          actions={{ updateFilters: this.updateFilters, resetFilters: this.resetFilters }}
        />

        <section ref='section' className='articles primary-content' id='articles'>

          <div className='toolbar'>

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
                totalCount={this.props.paginationData.totalCount}
                actions={this.props.exportActions}
              />
            </div>

            <Pagination {...this.props.paginationData}
              actions={{
                          first   : this.paginationFirstPage,
                          previous: this.paginationPreviousPage,
                          next    : this.paginationNextPage,
                          last    : this.paginationLastPage
                        }}
            />
          </div>


          <Loader loaded={!this.props.isFetchingArticles}>
            <ArticleList
              articles={this.props.articles}
              selectionActions={this.props.selectionActions}
              selectedArticleIds={this.props.selectedArticleIds}
              filterKeywords={this.props.filterKeywords}
              projectUid={this.props.params.projectUid}
            />
          </Loader>


          <div className="footer-pagination">
            <Pagination {...this.props.paginationData}
              actions={{
                          first   : this.paginationFirstPage,
                          previous: this.paginationPreviousPage,
                          next    : this.paginationNextPage,
                          last    : this.paginationLastPage
                        }}
            />
          </div>

        </section>

      </div>
    );
  }

}


function rectifyFilterValues(defaults, query) {

  let filterValues = Object.assign({}, defaults, query);

  // Ensure that arrays are in-place where needed:
  const filterArrayKeys = ['mediaSubtype', 'location', 'outlet', 'outletLanguage', 'primaryLanguage', 'tag' ];

  _.each(filterArrayKeys, (key) => {
    if(filterValues[key] !== undefined && _.isArray(filterValues[key]) === false) {
      filterValues[key] = [filterValues[key]];
    }
  });

  filterValues.perPage = parseInt(filterValues.perPage);
  filterValues.page = parseInt(filterValues.page);

  return filterValues;
}


const mapStateToProps = (state, ownProps) => {

  const selectedProject = _.find(state.projects.data, { uid: ownProps.params.projectUid });

  const filterValues = rectifyFilterValues(state.search.filterDefaults, ownProps.location.query);

  const paginationData = {
    page        : filterValues.page,
    pageSize    : filterValues.perPage,
    totalCount  : state.search.totalCount
  };

  return {
    articles            : state.search.data,
    collections         : selectedProject.collections,

    selectedArticleIds  : state.selectedArticleIds,
    filterKeywords      : filterValues.query,

    isFetchingArticles  : state.search.isBusy,
    isUpdatingCollection: state.projects.isBusy,

    filterValues        : filterValues,
    filterOptions       : state.filterOptions.data,

    paginationData      : paginationData

  };

};


const mapDispatchToProps = (dispatch, ownProps) => {
  return {

    exportActions: {
      exportSelected: (format) => { dispatch(exportSelectedArticles(format)); },
      exportAll: (format) => { dispatch(exportAllArticles(format)); }
    },

    collectionActions: {
      addToNewCollection: (newCollectionProps, articles) => {
        dispatch(addSelectedArticlesToNewCollection(newCollectionProps, articles, ownProps.params.projectUid));
      },
      addToExistingCollection: (collectionId, articles) => {
        dispatch(addSelectedArticlesToExistingCollection(collectionId, articles, ownProps.params.projectUid));
      }
    },

    selectionActions: {
      select: (id) => { dispatch(selectItem(id)); },
      deselect: (id) => { dispatch(deselectItem(id)); },
      selectAll: (ids) => { dispatch(selectAll(ids)); },
      deselectAll: () => { dispatch(deselectAll()); },
    },

    searchArticles: (filterValues) => {
      dispatch(searchArticles(ownProps.params.projectUid, filterValues));
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(ArticleListAppContainer);
