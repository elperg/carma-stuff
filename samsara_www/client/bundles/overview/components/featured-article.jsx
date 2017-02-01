import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Translate, Localize } from 'react-redux-i18n';
import { Link } from 'react-router';

class FeaturedArticle extends React.Component {

  static propTypes = {
    data : PropTypes.shape({
      uid             : PropTypes.string.isRequired,
      primaryHeadline : PropTypes.string.isRequired,
      primarySummary  : PropTypes.string.isRequired,
      assets          : PropTypes.array.isRequired
    }),
    projectUid : PropTypes.string.isRequired
  };


  constructor(props, context) {
    super(props, context);
  }

  render() {

    const { data } = this.props;

    let articleEl;

    if(data === null) {

      articleEl = (<p className='empty'><Translate value='overviews.featured_article.empty' /></p>);

    } else {

      const articleUrl = `/projects/${this.props.projectUid}/articles/${data.uid}`;

      // TODO: Make this directional
      const headline = (<h3><Link to={articleUrl}>{data.primaryHeadline}</Link></h3>);

      // CSS Line-clamping isn't at all well-supported, so we have to truncate the summary MANUALLY; UGH!
      // truncate to the first space of 230 chars (~4 lines)
      const summaryMaxChars = 230;
      let articleSummaryText, summary;
      if(data.primarySummary !== null) {
        articleSummaryText = (data.primarySummary.length > summaryMaxChars) ? data.primarySummary.substr(0, (data.primarySummary.indexOf(' ',summaryMaxChars))) + '\u2026' : data.primarySummary;
        summary = (<p>{articleSummaryText}</p>);
      }

      let asset;

      if(data.assets !== undefined && data.assets.length > 0) {

        const firstAsset = data.assets[0];

        if(/^image/.test(firstAsset.assetType) === true) {

          asset = (<p>RENDER AN IMAGE</p>);

        } else if(/^audio/.test(firstAsset.assetType) === true) {

          asset = (<p>RENDER AN AUDIO FILE</p>);

        } else if(/^video/.test(firstAsset.assetType) === true) {

          asset = (<p>RENDER A VIDEO</p>);

        }

      }

      articleEl = (<div>{headline}{summary}{asset}</div>);

    }

    return (
      <div>
        <h2 className='section__heading'><Translate value='overviews.featured_article.heading' /></h2>
        {articleEl}
      </div>
    );

  }
}


export default FeaturedArticle;

