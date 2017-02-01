import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Translate, Localize } from 'react-redux-i18n';
import { SentimentLevels } from 'lib/app-constants';

import MediaTypeSentimentBar from './media-type-sentiment-bar';

class MediaTypeSentiment extends React.Component {

  static propTypes = {
    data  : PropTypes.array
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {

    const { data } = this.props;


    let mediaElements;
//
//     if(data.length === 0) {
//
//       mediaElements = (<p className='empty'><Translate value='overviews.media_type_sentiment.empty' /></p>);
//
//     } else {
//
//       const sentimentBars = data.map((medium) => {
//
//         const mediaTypeName = medium.media.toLowerCase();
//
//         // each media type has data for each sentiment level, get those blocks out here in data
//         // and prepare them for <MediaTypeSentimentBar />
//         let sentiments = _.each(mediaTypeData, (data, key) => {
//           const sentimentLevelKey = SentimentLevels[key + 2];
//           const sentimentLevelName = <Translate value={'analytics.labels.'+sentimentLevelKey} />;
//           return {
//             label     : sentimentLevelName,
//             className : sentimentLevelKey,
//             pct       : mediaTypeData.percent,
//             tooltip   : <Translate value={'analytics.labels.'+sentimentLevelKey} sentiment={sentimentLevelName} count={mediaTypeData.count} />
//           };
//         });
//
//         // Create a <MediaTypeSentimentBar /> for each media type
//         return(
//           <MediaTypeSentimentBar
//             key={mediaTypeName}
//             label={<Translate value={'analytics.labels.'+mediaTypeName} />}
//             sentiments={sentiments}
//           />
//         );
//
//       });
//
//       // and then put them all inside of a <ul>
//       mediaElements = (<ul className='bar-chart bar-chart--stacked'>{sentimentBars}</ul>);
//     }

    return (
      <div>
        <h2><Translate value='overviews.media_type_sentiment.heading' /></h2>
        {mediaElements}
      </div>
    );

  }
}


export default MediaTypeSentiment;

