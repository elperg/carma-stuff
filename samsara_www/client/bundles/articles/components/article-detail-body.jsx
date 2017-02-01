import React, { PropTypes } from 'react';
import { Translate, Localize } from 'react-redux-i18n';
import VideoPlayer from 'lib/components/video-player';
import AudioPlayer from 'lib/components/audio-player';

import _ from 'lodash';
import moment from 'moment';

import { S3_HOST } from 'lib/app-constants';


export class ArticleDetailBody extends React.Component {
  static propTypes = {
    data      : PropTypes.shape({
                  assets                : PropTypes.any,
                  ave                   : PropTypes.any,
                  bodhiUrl              : PropTypes.any,
                  circulation           : PropTypes.any,
                  content               : PropTypes.any,
                  distributionCountries : PropTypes.any,
                  frequency             : PropTypes.any,
                  hits                  : PropTypes.any,
                  impressions           : PropTypes.any,
                  language              : PropTypes.any,
                  maxAve                : PropTypes.any,
                  maxImpressions        : PropTypes.any,
                  mediaSubtype          : PropTypes.any,
                  minAve                : PropTypes.any,
                  minImpressions        : PropTypes.any,
                  outletName            : PropTypes.any,
                  pageCount             : PropTypes.any,
                  pages                 : PropTypes.any,
                  primaryHeadline       : PropTypes.any,
                  primarySummary        : PropTypes.any,
                  publicUrl             : PropTypes.any,
                  publishedAt           : PropTypes.any,
                  region                : PropTypes.any,
                  section               : PropTypes.any,
                  sentiment             : PropTypes.any,
                  sizeWithUnit          : PropTypes.any,
                  tags                  : PropTypes.any
                }).isRequired
  };

  state = {
    showTab: 'summary'
  };

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'showSummary', 'showFullText');
  }

  showSummary() {
    this.setState({ showTab: 'summary' });
  }

  showFullText() {
    this.setState({ showTab: 'fulltext' });
  }

  sanitizeLineBreaks(str) {

    const breakKey = '<!!--PARA-BREAK--!!>';

    str = str.replace(/(\\n|\\r)/gmi, breakKey).replace(/\\/gmi, breakKey);
    const paragraphs = _.compact(str.split(breakKey));

    return paragraphs;

  }

  highlightHitsInParagraphs(hits, paragraphs) {
    // global key counter for React `key` attributes
    let keyCounter = 0;
    let markedUpParagraphs = [];

    // make sure `paragraphs` is an array
    if(_.isArray(paragraphs) === false) {
      throw new Error("<ArticleDetailBody /> highlightHitsInParagraphs(paragraphs) must take an array as an arguments");
    }

    if(_.isEmpty(hits) === true) {
      return paragraphs;
    }



     // loop through each paragraph
    _.each(paragraphs, (paragraph, i) => {

      let workingStr = paragraph;

      // now loop through each hit
      _.each(hits, (hit) => {

        let contentArr = [];

        // create the keyword regex for hits on word boundaries, and protect against <mark> tags if a hit is 'mark'
        const keywordRegex = new RegExp("\\b[^</]"+hit+"[^>]\\b","gmi");

        // replace machint
        while(workingStr.search(keywordRegex) > -1) {
          // get the index of the next occurrence
          const index = workingStr.search(keywordRegex);

          const before = workingStr.substr(0,index+1);
          const keyword = '<mark>'+hit+'</mark>';
          const after = workingStr.substr(index + hit.length + 1);

          workingStr = before+keyword+after;

        }

      });

      // once we've matched all this hits for the paragraph, dangerously set some HTML
      markedUpParagraphs.push(<span dangerouslySetInnerHTML={ {__html: workingStr} } />);

    });


    return markedUpParagraphs;
  }

  render() {

    const { data } = this.props;

    if(_.isEmpty(data) === true) {
      return <div />;
    }

    // If there's a summary in arabic, use the arabic summary, otherwise use the default summary
    let articleContentBody = (_.isEmpty(data.content) === false) ? data.content : data.primarySummary;

    // Sanitize line breaks
    let articleContentParagraphs = this.sanitizeLineBreaks(articleContentBody);
    let primaryHeadlineParagraphs = this.sanitizeLineBreaks(data.primaryHeadline);
    let primarySummaryParagraphs = this.sanitizeLineBreaks(data.primarySummary);

    // If we have hits, we're going to highlight
    if(_.isArray(data.hits) === true) {

//       articleContentParagraphs = this.highlightHitsInParagraphs(data.hits, articleContentParagraphs);
//       primarySummaryParagraphs = this.highlightHitsInParagraphs(data.hits, primarySummaryParagraphs);

    }

    // Now make paragraphs into <p> content
    const articleContent = articleContentParagraphs.map((paragraph, i) => {
      return (<p key={i}>{paragraph}</p>);
    });
    const primarySummary = primarySummaryParagraphs.map((paragraph, i) => {
      return (<p key={i}>{paragraph}</p>);
    });

    // Pull a thumbnail from an image
    // TODO: Need to also handle video and audio assets
    let thumbnails = [];
    let videos = [];
    if(data.assets !== null) {
      for(const asset of data.assets) {
        // if we have an image, prepare a thumbnail
        if(/^image/i.test(asset.filetype) === true) {
          thumbnails.push( <a key={asset.url} href={data.url}><img src={'https://bodhi-staging.imgix.net/'+asset.url} srcSet={'https://bodhi-staging.imgix.net/'+asset.url} /></a> );
        } else if(/^video/i.test(asset.filetype) === true) {
          // we've got a video!
          const videoUrl = S3_HOST+ '/' + asset.url;
          console.log("URL: ",videoUrl);
          videos.push(<VideoPlayer key={asset.url} url={videoUrl} />);
        } else if(/^audio/i.test(asset.filetype) === true) {
          // we've got a video!
          videos.push(<AudioPlayer key={asset.url} url={S3_HOST+ '/' + asset.url} />);
        }
      }
    }


    const publishedAt = moment(data.publishedAt);

    const summaryActiveClassName = (this.state.showTab === 'summary') ? ' is-active' : '';
    const fullTextActiveClassName = (this.state.showTab === 'fulltext') ? ' is-active' : '';

    return (
      <div className='article-detail-body'>

        <p className='date'>{publishedAt.format('ddd, D MMM YYYY')}</p>

        <div className='tabs'>

          <div className='tab_container'>
            <a className={'tab_link'+summaryActiveClassName} onClick={this.showSummary}><span className='tab_title'><Translate value='articles.labels.primary_summary' /></span></a>
            <div className={'tab_content'+summaryActiveClassName}>
              <h1 className='article__headline'>{primaryHeadlineParagraphs.join('')}</h1>
              <div className='article__summary'>{primarySummary}</div>
            </div>
          </div>

          <div className='tab_container'>
            <a className={'tab_link'+fullTextActiveClassName} onClick={this.showFullText}><span className='tab_title'><Translate value='articles.labels.content' /></span></a>
            <div className={'tab_content article__text'+fullTextActiveClassName}>
              {articleContent}
            </div>
          </div>

        </div>

        <div className='videos'>
          {videos}
        </div>
        <div className='thumbnails'>
          {thumbnails}
        </div>



      </div>
    );
  }
}


export default ArticleDetailBody;
