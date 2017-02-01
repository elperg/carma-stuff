import React, { PropTypes } from 'react';
import { Translate, Localize } from 'react-redux-i18n';

import ArticleListItem from './article-list-item';

export class ArticleList extends React.Component {

  static propTypes = {
    articles          : PropTypes.array.isRequired,
    selectionActions  : PropTypes.shape({
                          select    : PropTypes.func.isRequired,
                          deselect  : PropTypes.func.isRequired
                        }).isRequired,
    selectedArticleIds: PropTypes.array.isRequired,
    filterKeywords    : PropTypes.string,
    projectUid        : PropTypes.string.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {

    const { articles, selectionActions, selectedArticleIds, filterKeywords, projectUid } = this.props;

    if(articles.length > 0) {

      const articleItems = articles.map((articleData) => {
        return (
          <ArticleListItem
            key={articleData.id}
            data={articleData}
            selectionActions={selectionActions}
            isSelected={(selectedArticleIds.indexOf(articleData.id) > -1)}
            filterKeywords={filterKeywords}
            projectUid={projectUid}
          />
        );
      });

      return (
        <div className='article-list'>
          <ul>
            {articleItems}
          </ul>
        </div>
      );

    } else {

      return (
        <div className='article-list'>
          <p className='no-records'><em><Translate value='articles.index.no_records' /></em></p>
        </div>
      );
    }
  }
}

export default ArticleList;
