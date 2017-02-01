import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Loader from 'lib/components/loader';

import AddToCollection from 'lib/components/add-to-collection'
import ExportSingleArticle from '../components/export-single-article';

import ArticleDetailBody from '../components/article-detail-body';
import ArticleDetailMetadata from '../components/article-detail-metadata';

import { exportSingleArticle } from 'lib/actions/export';

import findArticleByUid from '../actions/find-article-by-uid';

class ArticleDetailAppContainer extends React.Component {

  static propTypes = {

    article             : PropTypes.object,
    collections         : PropTypes.array,

    isBusy              : PropTypes.bool.isRequired,
    isUpdatingCollection: PropTypes.bool.isRequired,

    isAdmin             : PropTypes.bool.isRequired,

    fetchArticle        : PropTypes.func.isRequired,
    exportSingleArticle : PropTypes.func.isRequired,

    collectionActions   : PropTypes.shape({
                          addToNewCollection      : PropTypes.func.isRequired,
                          addToExistingCollection : PropTypes.func.isRequired
                        }).isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.fetchArticle(this.props.params.articleUid);
  }

  render() {

    const selectedArticleIds = [this.props.articleId];

    // if we have collections, show the add to collection
    let addToCollection;
    if(this.props.collections !== undefined) {
      addToCollection = (<AddToCollection
              isUpdatingCollection={this.props.isUpdatingCollection}
              selectedArticleIds={[this.props.article.id]}
              collections={this.props.collections}
              actions={this.props.collectionActions}
            />);
    }

    return (

      <div className='article-detail-app'>
        <Loader loaded={!this.props.isBusy}>

          <div className="toolbar">

            <div className='actions'>

              {addToCollection}

              <ExportSingleArticle exportSingleArticle={this.props.exportSingleArticle} />

            </div>

          </div>


          <div className='flex-4to1'>
            <div className='primary-content'>
              <ArticleDetailBody data={this.props.article} />
            </div>
            <div className='secondary-content'>
              <ArticleDetailMetadata data={this.props.article} isAdmin={this.props.isAdmin} />
            </div>
          </div>

        </Loader>
      </div>
    );
  }

}



const mapStateToProps = (state, ownProps) => {

  const selectedProject = _.find(state.projects.data, { uid: ownProps.params.projectUid });

  let collections;
  if(selectedProject !== undefined) {
    collections = selectedProject.collections
  }

  const isAdmin = (state.user.data.admin !== undefined) ? state.user.data.admin : false;

  return {
    article     : state.article.data,
    collections : collections,
    isBusy      : state.article.isBusy,
    isUpdatingCollection: state.projects.isBusy,
    isAdmin     : isAdmin
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {

    fetchArticle: (articleUid) => { dispatch(findArticleByUid(articleUid, ownProps.params.projectUid)); },

    exportSingleArticle: (format) => { dispatch(exportSingleArticle(format)); },

    collectionActions: {
      addToNewCollection: (newCollectionProps, selectedArticleIds) => { dispatch(addSelectedArticlesToNewCollection(newCollectionProps, selectedArticleIds)); },
      addToExistingCollection: (collectionId, selectedArticleIds) => { dispatch(addSelectedArticlesToExistingCollection(collectionId, selectedArticleIds)); }
    }

  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetailAppContainer);
