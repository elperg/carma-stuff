import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Translate, Localize } from 'react-redux-i18n';
import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';

import countries from 'i18n-iso-countries';
import { SentimentLevels, IMGIX_HOST, SUMMARY_LENGTH } from '../app-constants';

import TagCloud from './tag-cloud';
import SentimentIndicator from './sentiment-indicator';

export class ArticleListItem extends React.Component {
  static propTypes = {
    // If you have lots of data or action properties, you should consider grouping them by
    // passing two properties: 'data' and 'actions'.
    data      : PropTypes.shape({
                                  id            : PropTypes.number.isRequired,
                                  uid           : PropTypes.string.isRequired,
                                  assets        : PropTypes.array,
                                  ave           : PropTypes.number,
                                  content       : PropTypes.any,
                                  frequency     : PropTypes.string,
                                  hits          : PropTypes.array,
                                  impressions   : PropTypes.number,
                                  language      : PropTypes.string,
                                  maxAve        : PropTypes.number,
                                  maxImpressions: PropTypes.number,
                                  mediaSubtype  : PropTypes.string,
                                  minAve        : PropTypes.number,
                                  minImpressions: PropTypes.number,
                                  outletName    : PropTypes.string,
                                  pageCount     : PropTypes.number,
                                  pages         : PropTypes.any,
                                  primaryHeadline : PropTypes.string,
                                  primarySummary  : PropTypes.string,
                                  publicUrl     : PropTypes.string,
                                  publishedAt   : PropTypes.string,
                                  region        : PropTypes.string,
                                  secondaryHeadline : PropTypes.string,
                                  secondarySummary  : PropTypes.string,
                                  section           : PropTypes.string,
                                  sentiment     : PropTypes.oneOf(['negative', 'somewhat_negative', 'neutral', 'somewhat_positive', 'positive']),
                                  tags          : PropTypes.object,
                                  url           : PropTypes.string
                                }).isRequired,

    selectionActions  : PropTypes.shape({
                          select    : PropTypes.func.isRequired,
                          deselect  : PropTypes.func.isRequired
                        }).isRequired,
    isSelected        : PropTypes.bool,
    filterKeywords    : PropTypes.string,
    projectUid        : PropTypes.string.isRequired
  };

  state = {
    isSelected   : false
  }

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'checkboxClick');
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isSelected: nextProps.isSelected });
  }

  checkboxClick() {

    // pull actions from props
    const { select, deselect } = this.props.selectionActions;
    const isSelected = this.state.isSelected;

    this.setState({ isSelected: !isSelected });

    // fire appropriate select/deselect action after a brief delay
    // this is necessary for UI responsiveness, since the store update
    // can delay the state change for the component
    _.delay((id) => {
      if(isSelected === true) {
        deselect(id);
      } else {
        select(id);
      }
    }, 15, this.props.data.id);
  }

  render() {
    const { data, filterKeywords, projectUid } = this.props;
    const currentLocale = 'en';

    const selectedClassName = (this.state.isSelected === true) ? 'selected' : '';

    const articleUrl = '/projects/'+projectUid+'/articles/'+data.uid;

    // If there's a summary in arabic, use the arabic summary, otherwise use the default summary
    let articleSummary = (_.isString(data.secondarySummary) === true) ? data.secondarySummary : data.primarySummary

    // If we have filterKeywords, we're going to highlight
//     if(_.isString(filterKeywords) === true && _.isEmpty(filterKeywords) === false) {
//       const keywordRegex = new RegExp("\\b"+filterKeywords+"\\b","gmi");
//
//       let workingStr = articleSummary;
//       let summaryArr = [];
//
//       while(workingStr.search(keywordRegex) > -1) {
//         // get the index of the next occurrence
//         const index = workingStr.search(keywordRegex);
//
//         // push the phrase from the front of the string to the first occurrence
//         summaryArr.push(workingStr.substr(0,index));
//
//         // now push the highlighted keyword
//         summaryArr.push(<span className='keyword-highlight'>{filterKeywords}</span>);
//
//         // now substr from the end of the occurrence
//         workingStr = workingStr.substr(index + filterKeywords.length);
//       }
//
//       // finally, append the remainder of 'workingStr'
//       summaryArr.push(workingStr);
//
//       // finally, reassign articleSummary to the array of summaryArr
//       articleSummary = summaryArr.join(' ');
//     }

    // CSS Line-clamping isn't at all well-supported, so we have to truncate the summary MANUALLY; UGH!
    // truncate to the first space of 230 chars (~4 lines)
    const summaryMaxChars = 230;
    if(articleSummary !== null) {
      articleSummary = (articleSummary.length > summaryMaxChars) ? articleSummary.substr(0, (articleSummary.indexOf(' ',summaryMaxChars))) + '\u2026' : articleSummary;
    }

    // Build the tag cloud from the <TagCloud />
    const tagCloud = (_.isEmpty(data.tags) === false) ? <TagCloud ref='tag-cloud' tags={data.tags} /> : undefined;

    // Pull a thumbnail from an image
    // Loop through data.assets to find an image
    let thumbnail = undefined;
    if(data.assets !== null) {
      for(const asset of data.assets) {
        // if we have an image, prepare a thumbnail
        if(/^image/i.test(asset.filetype) === true) {
          thumbnail = ( <Link to={articleUrl}><img src={IMGIX_HOST+'/'+asset.url} srcSet={IMGIX_HOST+'/'+asset.url} /></Link> );
          break;
        }
      }
    }

    // Make a native Date() object out of a JSON date string in the format "2016-03-23T18:25:43.511Z"
    const publishedAt = moment(data.publishedAt);

    // Determine frequency if it's not 'n/a'
    const frequency = (data.frequency !== 'n/a' && _.isEmpty(data.frequency) === false) ? <li><Translate value={`articles.labels.${data.frequency}`} /></li> : undefined;

    const region = (data.region === 'pan_arab') ? <Translate value='regions.pan_arab' /> : countries.getName(data.region, currentLocale);

    return (
      <li className={`article-list__item article-list-item flex-1to3to6to2 ${selectedClassName}`}>

        <div ref='selection' className={'select quarternary-content '+selectedClassName}>
          <div ref='checkbox' className='checkbox' onClick={this.checkboxClick}></div>
        </div>

        <div ref='outlet' className='outlet secondary-content'>
          <h2 className='outlet-name'>{data.outletName}</h2>
          <ul className='meta-list'>
            <li><Translate value={`media_subtypes.${data.mediaSubtype}`} /></li>
            {frequency}
            <li>{region}</li>
          </ul>
          {thumbnail}
        </div>

        <div ref='content' className='content primary-content'>
          <ul className='meta-list'>
            <li>
              <SentimentIndicator ref='sentiment-indicator' sentiment={data.sentiment} levels={3} includeLabel={true} />
            </li>
            <li><Translate value='articles.labels.impressions' impressions={numeral(data.impressions).format('0,0')} /></li>
            <li><Translate value='articles.labels.ave_as_currency' ave={numeral(data.ave).format('$0,0')} /></li>
          </ul>

          <h1 ref='headline' className='headline'><Link to={articleUrl}>{data.primaryHeadline}</Link></h1>

          <div ref='summary' className='summary'>{articleSummary}</div>

        </div>

        <div ref='content-metadata' className='metadata tertiary-content'>
          <p className='date'>{publishedAt.format('ddd, D MMM YYYY')}</p>

          {tagCloud}

        </div>

      </li>
    );
  }
}


export default ArticleListItem;
